import type { NextApiRequest, NextApiResponse } from 'next'
import {
  EmojiListArguments,
  EmojiListResponse,
  UsersListArguments,
  WebClient
} from '@slack/web-api'
import { slackEmojiType, slackUserType } from '@/type/slackapiType'

/**
 * カスタム絵文字取得API
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN

    const client = new WebClient(token)

    const option: EmojiListArguments = {}

    const emojiList: slackEmojiType[] = []

    const apiResponse: EmojiListResponse = await client.emoji.list(option)
    const keys = Object.keys(apiResponse?.emoji ?? '')
    const values = Object.values(apiResponse?.emoji ?? '')

    keys.forEach((emoji, idx) => {
      if (values[idx].includes('http')) {
        emojiList.push({
          key: emoji,
          value: values[idx]
        })
      }
    })

    res.status(200).json(emojiList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ result: 'error' })
  }
}
