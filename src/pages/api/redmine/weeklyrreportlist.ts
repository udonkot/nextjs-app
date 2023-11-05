import { redmineTicketType } from "@/type/redmineapiType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type ticketType = {
  issues: redmineTicketType[]
}

export type requestParam = {
  unitId:string,
  startdate: string,
  enddate: string,
}

/**
 * 週報取得API
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const param = req.query as requestParam
    // const id = req.query.id
    // if(typeof id === 'string') {
    //   throw new Error('wrong request type')
    // }
    // const params =req.query.text as string[]
    // const beginDate = params[0]
    // const endDate = params[1]

    const token = process.env.REDMINE_TOKEN ?? ''
    const base_url = process.env.REDMINE_URL ?? ''

    const project = 'projects/'.concat(param.unitId).concat('/')
    const json = 'issues.json'
    const option = {
      key: token,
      limit: '300',
      tracker_id: '1',
      status_id: '*',
      created_on: '%3E%3C'.concat(param.startdate).concat('|').concat(param.enddate)
    }

    const query = '?key='
      .concat(option.key)
      .concat('&limit=')
      .concat(option.limit)
      .concat('&tracker_id=')
      .concat(option.tracker_id)
      .concat('&status_id=')
      .concat(option.status_id)
      .concat('&created_on=')
      .concat(option.created_on)

    const url = base_url.concat(project).concat(json).concat(query)

    const apiResponse = await axios.get(url)
    if(apiResponse.status !== 200) {
      res.status(500).json({result:'error'});

    }

    const ticketList = apiResponse.data as ticketType
    res.status(200).json(ticketList);

  } catch (error) {
    console.error(error)
    res.status(500).json({result:'error'});
  }
}