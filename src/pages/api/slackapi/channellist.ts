import type { NextApiRequest, NextApiResponse } from "next";
import  {ConversationsListArguments , WebClient} from '@slack/web-api'

export type channelListType = {
  id: string,
  name: string,
}

/**
 * チャンネル一覧取得API
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN

    const client = new WebClient(token)

    const option:ConversationsListArguments = {}

    const channelList:channelListType[] = []

    const apiResponse = await client.conversations.list(option)
    apiResponse.channels?.forEach((channel) => {
      if( !channel.is_archived ) {
        channelList.push(
          {
            id: channel.id ?? 'none',
            name: channel.name ?? 'none',
          }
        )
      }
    })
    channelList.sort((a,b) => {
      if(a.name > b.name) {
        return 1
      } else {
        return -1
      }
    })

    res.status(200).json(channelList);

  } catch (error) {
    console.error(error)
    res.status(500).json({result:'error'});
  }
}