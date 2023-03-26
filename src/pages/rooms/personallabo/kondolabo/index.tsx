// import { WebClient } from '@slack/web-api'
import AshitaNoCloud from '@/components/container/organisms/AshitaNoCloud/AshitaNoCloud'
import AshitaNoCloudMBO from '@/components/container/organisms/AshitaNoCloud/AshitaNoCloudMBO'
import { useState } from 'react'

const sendMessage = async (message: string) => {
  await fetch('/api/slackapi/postmessage?text=' + message)
}

const getReaction = async (channel: string) => {
  await fetch('/api/slackapi/reactionsget?channel=' + channel)
}

export const Kondo = () => {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('')
  const [showTrial01Display, setShowTrial01Display] = useState(false)
  const [showTrial02Display, setShowTrial02Display] = useState(false)
  const [showTrial03Display, setShowTrial03Display] = useState(false)

  const showTrial01 = () => {
    setShowTrial01Display(!showTrial01Display)
  }

  const showTrial02 = () => {
    setShowTrial02Display(!showTrial02Display)
  }

  const showTrial03 = () => {
    setShowTrial03Display(!showTrial03Display)
  }

  return (
    <>
      <div className="contents">
        <div className="header">
          <h2>kondo page!</h2>
        </div>
        <div className="body">
          <div className="trial01">
            <label onClick={() => showTrial01()}>1.メッセージ送信</label>
            <br />
            {showTrial01Display && (
              <>
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button onClick={() => sendMessage(message)}>send</button>
                <br />
              </>
            )}
          </div>
          <div className="trial02">
            <label onClick={() => showTrial02()}>2.リアクション取得</label>
            <br />
            {showTrial02Display && (
              <>
                <input
                  type="text"
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                />
                <button onClick={() => getReaction(channel)}>
                  リアクション取得
                </button>
                <br />
              </>
            )}
          </div>
          <div className="trial03">
            <label onClick={() => showTrial03()}>
              3.あしたのクラウド評点シミュレータ
            </label>
            <br />
            {showTrial03Display && (
              <>
                <AshitaNoCloud />
              </>
            )}
          </div>
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

export default Kondo
