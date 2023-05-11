import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ConversationsHistoryArguments,
  ConversationsHistoryResponse,
  ConversationsRepliesArguments,
  ConversationsRepliesResponse,
  WebClient
} from '@slack/web-api'
import { slackCommentSummaryType, slackCommentType } from '@/type/slackapiType'
import { convertDate } from '@/util/slackapiUtil'

/**
 * コメント取得集計API
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_USERTOKEN

    // 取得対象のチャンネルID
    const channelId = (req.query.channelid as string) ?? ''
    // 集計タイプ
    const summarytype = (req.query.summarytype as string) ?? ''
    // 開始時間
    const startTime = (req.query.startTime as string) ?? ''
    // 終了時間
    const endTime = (req.query.endTime as string) ?? ''

    const client = new WebClient(token)
    const option: ConversationsHistoryArguments = {
      channel: channelId,
      limit: 1000,
      latest: endTime,
      oldest: startTime
    }

    // const emojiList: slackEmojiType[] = []

    const apiResponse: ConversationsHistoryResponse =
      await client.conversations.history(option)

    const getThreadResponse = async (threadTs: string) => {
      const option: ConversationsRepliesArguments = {
        channel: channelId,
        ts: threadTs
      }
      return await client.conversations.replies(option)
    }

    const comentDataList: slackCommentType[] = []
    const threadTsList: string[] = []

    apiResponse.messages
      ?.filter((msg) => msg.subtype === undefined)
      .forEach((msg) => {
        if (msg.ts !== undefined) {
          // スレッド内にコメントがある場合は別途取得
          if (msg.thread_ts !== undefined) {
            threadTsList.push(msg.thread_ts)
          } else {
            let commentDate = ''
            if (summarytype === 'month') {
              commentDate = convertDate(msg.ts).slice(0, 7)
            } else {
              commentDate = convertDate(msg.ts)
            }

            // 日付を変換
            const commentData: slackCommentType = {
              name: msg.user ?? '',
              date: commentDate
            }
            comentDataList.push(commentData)
          }
        }
      })

    if (threadTsList.length > 0) {
      await threadTsList.reduce(async (prev, curr) => {
        await prev
        const reply = await getThreadResponse(curr)
        reply.messages?.forEach((msg) => {
          let commentDate = ''
          if (summarytype === 'month') {
            commentDate = convertDate(msg.ts ?? '').slice(0, 7)
          } else {
            commentDate = convertDate(msg.ts ?? '')
          }
          const commentData: slackCommentType = {
            name: msg.user ?? '',
            date: commentDate
          }
          comentDataList.push(commentData)
        })
      }, Promise.resolve())
    }

    const ret: slackCommentSummaryType[] = []
    comentDataList.forEach((commentData) => {
      const idx = ret.findIndex(
        (summarydata) =>
          summarydata.commentInfo.name === commentData.name &&
          summarydata.commentInfo.date === commentData.date
      )
      if (idx >= 0) {
        ret[idx].summary = ret[idx].summary + 1
      } else {
        ret.push({
          commentInfo: {
            name: commentData.name,
            date: commentData.date
          },
          summary: 1
        })
      }
    })

    // 日付の降順にソート
    ret.sort((data1, data2) => {
      if (data1.commentInfo.date > data2.commentInfo.date) {
        return -1
      } else {
        return 1
      }
    })

    res.status(200).json(ret)
  } catch (error) {
    console.error(error)
    res.status(500).json({ result: 'error' })
  }
}
