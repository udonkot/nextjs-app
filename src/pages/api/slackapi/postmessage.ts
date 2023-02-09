import type { NextApiRequest, NextApiResponse } from "next";
import  {WebClient} from '@slack/web-api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN
    const channel = 'C015TFG556F'
    const message = req.query.text as string

    const client = new WebClient(token)

    // お試しでメッセージ送信
    await client.chat.postMessage(
      {
        channel: channel,
        text: message ?? ''
      })
  } catch (error) {
    console.error(error)
  }

  // const sampleOption = {
  //   "callback_id": "ryde-46e2b0",
  //   "title": "Request a Ride",
  //   "submit_label": "Request",
  //   "state": "Limo",
  //   "elements": [
  //     {
  //       "type": "text",
  //       "label": "Pickup Location",
  //       "name": "loc_origin"
  //     },
  //     {
  //       "type": "text",
  //       "label": "Dropoff Location",
  //       "name": "loc_destination"
  //     }
  //   ]
  // }

  // // ダイアログ表示
  // try {
  //   client.dialog.open
  // } catch(error) {
  //   console.error(error)

  // }



  res.status(200).json({ ret: 'OK' });
}