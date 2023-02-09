import type { NextApiRequest, NextApiResponse } from "next";
import  {WebClient} from '@slack/web-api'

/**
 * リアクション取得API
 * TODO:作成中
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN
    const channel = req.query.channel as string

    const client = new WebClient(token)

    // お試しでメッセージ送信
    const reactions = await client.reactions.get(
      {
        channel: channel,
        token: token
      }
    )
    res.status(200).json(reactions)
  } catch (error) {
    console.error(error)
  }

  res.status(200).json({ ret: 'OK' });
}