import type { NextApiRequest, NextApiResponse } from "next";
import  {UsersListArguments , WebClient} from '@slack/web-api'

export type userListType = {
  id: string,
  name: string,
  displayname: string,
}

/**
 * アクティブユーザ取得API
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.NEXTJS_APP_SLACK_TOKEN

    const client = new WebClient(token)

    const option:UsersListArguments   = {}

    const userList:userListType[] = []

    const apiResponse = await client.users.list(option)
    apiResponse.members?.forEach((member) => {
      if( !member.deleted ) {
        userList.push(
          {
            id: member.id ?? 'none',
            name: member.name ?? 'none',
            displayname: member.profile?.display_name ?? 'none',
          }
        )
      }
    })

    userList.sort((a,b) => {
      if(a.name > b.name) {
        return 1
      } else {
        return -1
      }
    })

    res.status(200).json(userList);

  } catch (error) {
    console.error(error)
    res.status(500).json({result:'error'});
  }
}