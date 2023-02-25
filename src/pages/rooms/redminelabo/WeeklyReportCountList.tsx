import {
  redmineTicketResponseType,
  redmineTicketType,
  redmineUserResponseType,
  redmineUserType
} from '@/type/redmineapiType'
import { RootState } from '@/store/createStore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type summaryType = {
  author: string
  count: number
}

const projects = [{ value: 'u-006', label: 'DXサービス' }]

/**
 * Redmine週報チケットユーザ一覧取得API
 * @returns
 */
const getWeeklyReportList = async (
  unitId: string,
  startdate: string,
  enddate: string
) => {
  const query = '?unitId='
    .concat(unitId)
    .concat('&startdate=')
    .concat(startdate)
    .concat('&enddate=')
    .concat(enddate)
  const url = '/api/redmine/weeklyrreportlist'

  const response = await fetch(url.concat(query))
  const data = await response.json()
  return data
}

/**
 * Redmineユーザ一覧画面
 * @returns
 */
export const WeeklyReportCountList = () => {
  // storeから取得
  // const redmineUser = useSelector(
  //   (state: RootState) => state.redmineUser.redmineUserList
  // )
  // const dispatch = useDispatch()

  // useState
  const [ticketList, setTicketList] = useState<redmineTicketType[]>([])
  const [unit, setUnit] = useState('')
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')

  // 初期表示後の処理
  useEffect(() => {
    // if (redmineUser.length > 0) {
    //   // setTicketList(redmineUser)
    // } else {
    //   // storeから取得できない場合はAPI呼び出し
    // }
  }, [])

  const getTicket = async (
    unit: string,
    startdate: string,
    enddate: string
  ) => {
    const res = (await getWeeklyReportList(
      unit,
      startdate,
      enddate
    )) as redmineTicketResponseType
    setTicketList(res.issues)
    // storeにセット
  }

  const buttonClick = () => {
    getTicket(unit, startdate, enddate)
  }

  const unitChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUnit(event.target.value)
  }

  const startDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setStartdate(event.target.value)
  }

  const endDateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnddate(event.target.value)
  }

  const dispSummaryList = () => {
    const dataList: JSX.Element[] = []
    const summary: summaryType[] = []
    if (ticketList.length > 0) {
      ticketList?.forEach((ticket: redmineTicketType) => {
        const element = summary.findIndex(
          (r) => r.author === ticket.author.name
        )

        if (element > -1) {
          summary[element].count++
        } else {
          summary.push({
            author: ticket.author.name,
            count: 1
          })
        }

        return summary
      }, [])

      summary.sort((a, b) => {
        if (a.count > b.count) {
          return -1
        } else {
          return 1
        }
      })

      summary.forEach((data, idx) => {
        dataList.push(
          <tr>
            <td>{idx + 1}</td>
            <td>{data.author}</td>
            <td>{data.count}</td>
          </tr>
        )
      })
    }

    //   })
    // }
    return dataList
  }

  return (
    <>
      <div className="contents">
        <div className="body">
          <label>集計期間：</label>
          <input type="text" onChange={startDateChange} />～
          <input type="text" onChange={endDateChange} />
          <label>※yyyy-mm-ddで入力(例：2022-01-01)</label>
          <br />
          <label>ユニット：</label>
          <select onChange={unitChange}>
            <option value="" defaultChecked>
              -
            </option>
            <option value="u-006">DXサービスユニット</option>
            <option value="u-007">DXクラウドユニット</option>
            <option value="u-005">DXアジャイルユニット</option>
            <option value="u-004">DX公共ユニット</option>
            <option value="u-003">ICTユニット</option>
            <option value="u-008">メディアユニット</option>
            <option value="u-009">公共ユニット</option>
            <option value="u-002">法人通信ユニット</option>
            <option value="u-010">社会ユニット</option>
            <option value="u-001">社会通信ユニット</option>
            <option value="u-011">営業ユニット</option>
            <option value="u-012">業務ユニット</option>
            <option value="u-013">R&Dユニット</option>
          </select>
          <br />
          <button onClick={() => buttonClick()}>実行</button>
          <br />
          {ticketList?.length > 0 && (
            <div className="result">
              <table border={1}>
                <thead>
                  <tr>
                    <td>No</td>
                    <td>名前</td>
                    <td>提出数</td>
                  </tr>
                </thead>
                <tbody>{dispSummaryList()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default WeeklyReportCountList
