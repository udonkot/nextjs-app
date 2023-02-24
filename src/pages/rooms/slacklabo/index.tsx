import Link from 'next/link'
import { useEffect, useState } from 'react'
import Channellist from './channellist'
import Userlist from './userlist'

/**
 *
 * @returns
 */
export const Slacklabo = () => {
  const [showChannel, setShowChannel] = useState(false)
  const [showChannelMsg, setshowChannelMsg] = useState('表示')
  const [showUser, setShowUser] = useState(false)
  const [showUserMsg, setshowUserMsg] = useState('表示')

  useEffect(() => {}, [showChannel])

  /**
   * チャンネル表示非表示ボタン切替
   */
  const changeShowChannel = () => {
    if (!showChannel) {
      setshowChannelMsg('非表示')
    } else {
      setshowChannelMsg('表示')
    }
    setShowChannel(!showChannel)
  }

  /**
   * ユーザ表示非表示ボタン切替
   */
  const changeShowUser = () => {
    if (!showUser) {
      setshowUserMsg('非表示')
    } else {
      setshowUserMsg('表示')
    }
    setShowUser(!showUser)
  }

  return (
    <>
      <div className="contents">
        <div className="header">
          <h2>SlackLabo page!</h2>
          <br />
        </div>
        <div className="body">
          <div>
            <h3 style={{ display: 'inline' }}>1.ユーザ一覧</h3>
            <button onClick={() => changeShowUser()}>{showUserMsg}</button>
            <p>SlackAPIを使用したユーザ一覧表示※Activeユーザのみ</p>
            <br />
            {showUser && <Userlist />}
          </div>

          <div>
            <h3 style={{ display: 'inline' }}>2.チャンネル一覧</h3>
            <button onClick={() => changeShowChannel()}>
              {showChannelMsg}
            </button>
            <p>SlackAPIを使用したチャンネル一覧表示※publicチャンネルのみ</p>
            {showChannel && <Channellist />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Slacklabo
