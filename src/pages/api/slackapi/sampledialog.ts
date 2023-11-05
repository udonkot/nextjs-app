import type { NextApiRequest, NextApiResponse } from "next";
import  {ViewsOpenArguments, ViewsUpdateArguments, WebClient} from '@slack/web-api'
import  {createMessageAdapter } from '@slack/interactive-messages'
import  {App  } from '@slack/bolt'

const token = process.env.NEXTJS_APP_SLACK_TOKEN;
const secret = 'ca7b53de62467c4600101a87b45940f1'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // const startbolt = async() => {
  //   const app = new App({
  //     token: token,
  //     signingSecret: secret,
  //   })

  //   console.log('create app');

  //     // Start your app
  //     console.log('before run!');
  //     await app.start(process.env.PORT || 3000);

  //     console.log('Bolt app is running!');

  // }

  // await startbolt()

  // app.command('/open/modal', async ({ ack, body, context }) => {
  //   try {
  //     // モーダルを開くための Slack API メソッドを呼び出す
  //     const result = await app.client.views.open({
  //       token: context.botToken,
  //       trigger_id: body.trigger_id,
  //       view: {
  //         type: 'modal',
  //         callback_id: 'my-modal',
  //         title: {
  //           type: 'plain_text',
  //           text: 'My Modal'
  //         },
  //         submit: {
  //           type: 'plain_text',
  //           text: 'Submit'
  //         },
  //         blocks: [
  //           {
  //             type: 'section',
  //             text: {
  //               type: 'mrkdwn',
  //               text: 'Click the button below:'
  //             },
  //             accessory: {
  //               type: 'button',
  //               text: {
  //                 type: 'plain_text',
  //                 text: 'Button'
  //               },
  //               action_id: 'button-action'
  //             }
  //           }
  //         ]
  //       }
  //     });
  //     console.log(result);
  //     ack();
  //   } catch (error) {
  //     console.error(error);
  //     ack('Failed to open modal');
  //   }
  // })



  // const modal_node_sdk = async() => {
    try {
      const token = process.env.NEXTJS_APP_SLACK_TOKEN
      const channel = 'C015TFG556F'

      const client = new WebClient(token)

      const secret='ca7b53de62467c4600101a87b45940f1'
      const slackinteraction = createMessageAdapter(secret);

      // slackinteraction.viewSubmission('callbackTest01', (payload) => {
      //   console.log(payload)
      // })

      // await slackinteraction.start(3001)

      const dialogOption:ViewsOpenArguments   = {
        view: {
          type: 'modal',
          callback_id: 'callbackTest01',
         external_id: 'external01' ,

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
              type: "header",
              text: {
                type: "plain_text",
                text: "ようこそ".concat(req.body.user_name)
              }
            },
            {
              type: "input",
              element: {
                action_id: 'weight',
                type: "plain_text_input"
              },
              label: {
                type: "plain_text",
                text: "メッセージを入力してください",
                emoji: false
              },
              block_id: 'block01',
            },
          ],
        },
        trigger_id :req.body.trigger_id as string
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