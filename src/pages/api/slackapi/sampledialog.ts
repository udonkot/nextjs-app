import type { NextApiRequest, NextApiResponse } from "next";
import  {ViewsOpenArguments, WebClient} from '@slack/web-api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN
    const channel = 'C015TFG556F'

    const client = new WebClient(token)

    const dialogOption:ViewsOpenArguments  = {
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'sample modal'
        },
        close: {
          type: 'plain_text',
          text: 'close'
        },
        blocks: []
      },
      trigger_id :req.query.trigger_id as string
    }

    // ダイアログ表示
    const viewResult = client.views.open(dialogOption)
    console.log(viewResult)

    res.status(200).json(viewResult);

  } catch (error) {
    console.error(error)
  }
}