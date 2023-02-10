import { useState } from 'react'
import { channelListType } from '../../api/slackapi/channellist'

/**
 * チャンネル一覧取得API
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
  const [chauserList, setChannelList] = useState<channelListType[]>([])
  const [showTrial02Display, setShowTrial02Display] = useState(false)

  const showTrial02 = async () => {
    const channels = (await getChannelList()) as channelListType[]
    setChannelList(channels)
    setShowTrial02Display(!showTrial02Display)
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
        <div className="header">
          <h2>slack page!</h2>
        </div>
        <div className="body">
          <label onClick={() => showTrial02()}>
            2.Slackチャンネル一覧※ラベルクリックで表示
          </label>
          <br />
          {showTrial02Display && (
            <>
              <table border={1}>
                <thead>
                  <td>No</td>
                  <td>Name</td>
                  <td>ID</td>
                </thead>
                <tbody>{dispChannelList()}</tbody>
              </table>
            </>
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

export default Channellist
