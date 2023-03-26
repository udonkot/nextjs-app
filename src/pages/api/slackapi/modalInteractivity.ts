import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ViewsOpenArguments,
  ViewsUpdateArguments,
  WebClient
} from '@slack/web-api'
import { createMessageAdapter } from '@slack/interactive-messages'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.NEXTJS_APP_SLACK_TOKEN
  const client = new WebClient(token)
  const param = JSON.parse(req.body.payload)

  if (param?.view?.state?.values?.block01) {
    const weight = param?.view?.state?.values?.block01.weight.value

    const user = param.user.username
    const ch = param.user.id
    // const ch = 'C015TFG556F'
    client.chat.postMessage({
      channel: ch,
      text: user.concat('の入力したメッセージ:').concat(weight)
    })
  }

  res.status(200).end()
}
