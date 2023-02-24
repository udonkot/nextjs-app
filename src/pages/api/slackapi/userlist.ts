import type { NextApiRequest, NextApiResponse } from "next";
import  {UsersListArguments , WebClient} from '@slack/web-api'
import { slackUserType } from "@/pages/type/slackapiType";

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

    const userList:slackUserType[] = []

    const apiResponse = await client.users.list(option)
    apiResponse.members?.forEach((member) => {
      if( !member.deleted ) {
        let memo, displayName, unit, realName :string = '';

        const display = member.profile?.display_name?.split('-') ?? []
        if(display?.length === 2) {
          displayName = display[0]
          memo = display[1]
        }

        const real = member.real_name?.split('-') ?? []
        if(real?.length === 2) {
          realName = real[0]
          unit = real[1]
        }

        userList.push(
          {
            id: member.id ?? 'none',
            name: member.name ?? 'none',
            displayname: displayName ?? member.profile?.display_name ?? 'none',
            realname: realName ?? member.real_name ?? 'none',
            memo: memo ?? '',
            unitname: unit ?? '',
          }
        )
      }
    })

    userList.sort((a,b) => {
      if(a.unitname !== b.unitname) {
        if(a.unitname > b.unitname) {
          return -1
        } else {
          return 1
        }
      }

      if(a.displayname !== b.displayname ) {
        if(a.displayname > b.displayname) {
          return -1
        } else {
          return 1
        }
      }
      return 1
    })


    res.status(200).json(userList);

  } catch (error) {
    console.error(error)
    res.status(500).json({result:'error'});
  }
}