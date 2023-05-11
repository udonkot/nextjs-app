import { slackCannelType } from '@/type/slackapiType'
import { ChangeEventHandler } from 'react'
import { getYYYYMMList, get3MonthDate, createYYYYMM } from '@/util/slackapiUtil'

type PropType = {
  beforerange?: number
  afterrange?: number
  setTargetDate: (targetDate: Date) => void
  // onChange: ChangeEventHandler<HTMLSelectElement>
}

/**
 * 年月日選択セレクトボックス
 * @param props
 * @returns
 */
export const YmdSelect = (props: PropType) => {
  //
  const ymdList: string[] = []
  const dateList = get3MonthDate()
  dateList.forEach((data) => {
    ymdList.push(createYYYYMM(data.toLocaleDateString('ja-JP').split('/')))
  })

  // オプション情報生成
  const options: JSX.Element[] = []
  options.push(
    <option key={'-'} defaultChecked defaultValue="-">
      {'-'}
    </option>
  )
  let i = 0
  ymdList.forEach((idx, data) => {
    options.push(
      <option key={idx} value={data}>
        {idx}
      </option>
    )
  })

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    props.setTargetDate(dateList[Number(event.target.value)])
  }

  return (
    <>
      <div>
        <select onChange={onChange}>{options}</select>
      </div>
    </>
  )
}

export default YmdSelect
function useSate<T>(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.')
}
