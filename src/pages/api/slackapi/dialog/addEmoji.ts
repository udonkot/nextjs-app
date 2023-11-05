import type { NextApiRequest, NextApiResponse } from 'next'
import { ViewsOpenArguments, WebClient } from '@slack/web-api'
import { createMessageAdapter } from '@slack/interactive-messages'

/**
 *
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN
    const channel = 'C015TFG556F'

    const client = new WebClient(token)

    const dialogOption: ViewsOpenArguments = {
      view: {
        type: 'modal',
        callback_id: 'callbackTest01',
        external_id: 'external01',

        title: {
          type: 'plain_text',
          text: 'sample modal'
        },
        submit: {
          type: 'plain_text',
          text: '送信'
        },
        close: {
          type: 'plain_text',
          text: 'close'
        },
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'ようこそ'.concat(req.body.user_name)
            }
          },
          {
            type: 'input',
            element: {
              action_id: 'weight',
              type: 'plain_text_input'
            },
            label: {
              type: 'plain_text',
              text: 'メッセージを入力してください',
              emoji: false
            },
            block_id: 'block01'
          }
        ]
      },
      trigger_id: req.body.trigger_id as string
    }

    // ダイアログ表示
    const viewResult = await client.views.open(dialogOption)
    // console.log(viewResult)

    res.status(200).end()
  } catch (error) {
    console.error(error)
  }
  // }
}
