import { slackCannelType } from '@/type/slackapiType'
import { ChangeEventHandler } from 'react'

type PropType = {
  channelInfo: slackCannelType[]
  onChange: ChangeEventHandler<HTMLSelectElement>
}

/**
 * チャンネル一覧セレクトボックス
 * @param props
 * @returns
 */
export const SlackChannelSelect = (props: PropType) => {
  // オプション情報生成
  const options: JSX.Element[] = []
  options.push(
    <option key={'-'} defaultChecked defaultValue="-">
      {'-'}
    </option>
  )
  let i = 0
  while (props.channelInfo.length > i) {
    options.push(
      <option key={props.channelInfo[i]?.id} value={props.channelInfo[i]?.id}>
        {props.channelInfo[i]?.name}
      </option>
    )
    i = i + 1
  }

  return (
    <>
      <div>
        <select onChange={props.onChange}>{options}</select>
      </div>
    </>
  )
}

export default SlackChannelSelect
function useSate<T>(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.')
}
