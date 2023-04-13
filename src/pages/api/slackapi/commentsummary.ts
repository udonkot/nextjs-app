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
    const token = process.env.NEXTJS_APP_SLACK_TOKEN

    // 取得対象のチャンネルID
    const channelId = (req.query.channelid as string) ?? ''

    console.log(channelId)

    const client = new WebClient(token)

    const option: ConversationsHistoryArguments = {
      channel: channelId,

      limit: 1000
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
            // 日付を変換
            const commentData: slackCommentType = {
              name: msg.user ?? '',
              date: convertDate(msg.ts)
            }
            comentDataList.push(commentData)
          }
        }
      })

    if (threadTsList.length > 0) {
      const replyResponse: ConversationsRepliesResponse[] = await Promise.all(
        threadTsList.map(async (threadTs) => {
          const threadMsg = await getThreadResponse(threadTs)
          return threadMsg
        })
      )

      replyResponse.forEach((reply) => {
        reply.messages?.forEach((msg) => {
          const commentData: slackCommentType = {
            name: msg.user ?? '',
            date: convertDate(msg.ts ?? '')
          }
          comentDataList.push(commentData)
        })
      })
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
