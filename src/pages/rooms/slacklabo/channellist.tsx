import { slackCannelType } from '@/pages/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'
import { RootState } from 'src/store/createStore'

/**
 * Slackチャンネル一覧取得API
 * @returns
 */
const getChannelList = async () => {
  const response = await fetch('/api/slackapi/channellist')
  const data = await response.json()
  return data
}

/**
 * Slackチャンネル一覧画面
 * @returns
 */
export const Channellist = () => {
  // storeから取得
  const slackChannel = useSelector(
    (state: RootState) => state.slackChannel.slackChannelList
  )
  const dispatch = useDispatch()

  // useState
  const [chauserList, setChannelList] = useState<slackCannelType[]>([])

  // 初期表示後の処理
  useEffect(() => {
    if (slackChannel.length > 0) {
      setChannelList(slackChannel)
    } else {
      // storeから取得できない場合はAPI呼び出し
      getSlackChannel()
    }
  }, [])

  const getSlackChannel = async () => {
    const channels = (await getChannelList()) as slackCannelType[]
    setChannelList(channels)
    dispatch(
      setStateSlackChannel({
        slackChannelList: channels
      })
    )
  }

  const dispChannelList = () => {
    const dataList: JSX.Element[] = []
    chauserList.forEach((data, idx) => {
      dataList.push(
        <tr key={idx}>
          <td>{idx}</td>
          <td>{data.name}</td>
          <td>{data.id}</td>
        </tr>
      )
    })
    return dataList
  }

  return (
    <>
      <div className="contents">
        <div className="body">
          <>
            <table border={1}>
              <thead>
                <tr>
                  <td>No</td>
                  <td>Name</td>
                  <td>ID</td>
                </tr>
              </thead>
              <tbody>{dispChannelList()}</tbody>
            </table>
          </>
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

export default Channellist
