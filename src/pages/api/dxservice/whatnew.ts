import { redmineUserType } from '@/type/redmineapiType'
import axios from 'axios'
import { load } from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'

export type userListType = {
  users: redmineUserType[]
}

/**
 * アクティブユーザ取得API
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const base_url = process.env.DXSERVICE_PORTAL_URL ?? ''

    const apiResponse = await axios.get(base_url)
    if (apiResponse.status !== 200) {
      res.status(500).json({ result: 'error' })
    }

    const html = apiResponse.data
    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = ('00' + (date.getMonth() + 1)).slice(-2)
    const dd = ('00' + date.getDate()).slice(-2)
    const ymd = yyyy.toString().concat('/').concat(mm).concat('/').concat(dd)

    const titleDecolate = '*****'

    const infoList: string[] = [
      titleDecolate.concat(ymd).concat('現在のWHATS NEW').concat(titleDecolate)
    ]
    const $ = load(html)
    $('.n8H08c', html).each((idx, element) => {
      $(element)
        .find('li')
        .find('p')
        .each((idx2, ele2) => {
          infoList.push('・'.concat($(ele2).text()))
        })
    })

    const format: string = '```'
    const resMessage = format.concat()

    res
      .setHeader('content-type', 'text/html; charset=utf-8')
      .status(200)
      .send(format.concat(infoList.join('\n')).concat('```'))
  } catch (error) {
    console.error(error)
    res.status(500).json({ result: 'error' })
  }
}
