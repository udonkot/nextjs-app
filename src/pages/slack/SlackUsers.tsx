// import { WebClient } from '@slack/web-api'
import { resolve } from 'path'
import { useState } from 'react'
import { userListType } from '../api/slackapi/userlist'

const getUserList = async () => {
  return await fetch('/api/slackapi/userlist')
}

export const SlackUsers = () => {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('')
  const [showTrial01Display, setShowTrial01Display] = useState(false)
  const [showTrial02Display, setShowTrial02Display] = useState(false)

  const showTrial01 = async () => {
    const result = (await getUserList()) as unknown as {
      result: string
      userlist: userListType[]
    }
    console.log(result)
  }

  const showTrial02 = () => {
    setShowTrial02Display(!showTrial02Display)
  }

  return (
    <>
      <div className="contents">
        <div className="header">
          <h2>slack page!</h2>
        </div>
        <div className="body">
          <label onClick={() => showTrial01()}>1.ユーザ一覧</label>
          <br />
          {showTrial01Display && (
            <>
              <br />
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

export default SlackUsers
