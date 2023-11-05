import { redmineUserType } from "@/type/redmineapiType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type userListType = {
  users: redmineUserType[]
}

/**
 * アクティブユーザ取得API
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.REDMINE_TOKEN ?? ''
    const base_url = process.env.REDMINE_URL ?? ''
    const json = 'users.json'
    const option = {
      key: token,
      limit: '300'
    }
    const query = '?key='.concat(option.key).concat('&limit=').concat(option.limit)

    const url = base_url.concat(json).concat(query)

    const apiResponse = await axios.get(url)
    if(apiResponse.status !== 200) {
      res.status(500).json({result:'error'});

    }

    const userList = apiResponse.data as userListType
    userList.users.sort((a,b) => {
      if(a.id > b.id) {
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