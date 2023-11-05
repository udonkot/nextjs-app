// import { WebClient } from '@slack/web-api'
import AshitaNoCloud from '@/components/container/organisms/AshitaNoCloud/AshitaNoCloud'
import AshitaNoCloudMBO from '@/components/container/organisms/AshitaNoCloud/AshitaNoCloudMBO'
import { useState } from 'react'
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setState as setAppHeader } from 'src/slice/appHeaderSlice'

import { RootState } from '@/store/createStore'
import { setAppHeaderArea } from '@/util/commonUtil'

const sendMessage = async (message: string) => {
  await fetch('/api/slackapi/postmessage?text=' + message)
}

const getReaction = async (channel: string) => {
  await fetch('/api/slackapi/reactionsget?channel=' + channel)
}

/**
 *
 * @returns
 */
export const Kondo = () => {
  const dispatch = useDispatch()

  // storeにセット
  setAppHeaderArea('Kondo Page', ['main', 'Personal Labo'], dispatch)

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
        <div className="body">
          {/* <div className="trial01">
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
          </div> */}
          <Card bg="yellow.100">
            <CardHeader>
              <Heading size="md"> あしたのクラウド評点シミュレータ</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                評点を入力するとスキルマップ、役職職責評価、MBOの合計と総合計が計算されます
              </Text>
            </CardBody>
            <CardFooter>
              <Button onClick={() => showTrial03()}>View here</Button>
            </CardFooter>
          </Card>
          {showTrial03Display && (
            <>
              <AshitaNoCloud />
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

export default Kondo
