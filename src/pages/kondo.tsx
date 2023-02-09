// import { WebClient } from '@slack/web-api'
import { useState } from 'react'

const sendMessage = async (message: string) => {
  await fetch('/api/slackapi/postmessage?text=' + message)
}

export const Kondo = () => {
  const [message, setMessage] = useState('')

  return (
    <>
      <h2>kondo page!</h2>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={() => sendMessage(message)}>send</button>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default Kondo
