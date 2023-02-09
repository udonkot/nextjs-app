import type { NextApiRequest, NextApiResponse } from "next";
import  {DialogOpenArguments, WebClient} from '@slack/web-api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN
    const channel = 'C015TFG556F'

    const client = new WebClient(token)

    const dialogOption:DialogOpenArguments = {
      dialog: {
        title: 'sample dialog',
        callback_id: '',
        elements: [
        ]
      },
      trigger_id :req.query.trigger_id as string
    }

    // ダイアログ表示
    const dialogRet = client.dialog.open(dialogOption)
    console.log(dialogRet)

    res.status(200).json({ ret: dialogRet });

  } catch (error) {
    console.error(error)
  }
}