import { Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Channellist from './channellist'
import Emojilist from './emojilist'
import Userlist from './userlist'
import styles from '@/styles/Home.module.css'
import NextLink from 'next/link'
import { useDispatch } from 'react-redux'
import { setHeaderTitle } from '@/util/commonUtil'

/**
 *
 * @returns
 */
export const Slacklabo = () => {
  const [showChannel, setShowChannel] = useState(false)
  const [showChannelMsg, setshowChannelMsg] = useState('表示')
  const [showUser, setShowUser] = useState(false)
  const [showUserMsg, setshowUserMsg] = useState('表示')
  const [showEmoji, setShowEmoji] = useState(false)
  const [showEmojiMsg, setshowEmojiMsg] = useState('表示')

  const dispatch = useDispatch()

  // storeにセット
  setHeaderTitle('Slack Labo Page', dispatch)

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

  /**
   * Slack絵文字表示非表示ボタン切替
   */
  const changeShowEmoji = () => {
    if (!showEmoji) {
      setshowEmojiMsg('非表示')
    } else {
      setshowEmojiMsg('表示')
    }
    setShowEmoji(!showEmoji)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 1, x: -10 }} // 初期状態
        animate={{ opacity: 10, x: 10 }} // マウント時
        exit={{ opacity: 0, y: 10 }} // アンマウント時
        // transition={{
        //   duration: 3.5
        // }}
      >
        <div className="contents">
          <div className="header">
            <h2>SlackLabo page!</h2>
            <br />
          </div>
          <div className="body">
            <div className={styles.grid}>
              <NextLink href={'/rooms/slacklabo/userlist'} passHref>
                <h3 style={{ display: 'inline' }}>1.ユーザ一覧</h3>
                <p>SlackAPIを使用したユーザ一覧表示※Activeユーザのみ</p>
              </NextLink>
            </div>
            <br />

            <div className={styles.grid}>
              <NextLink href={'/rooms/slacklabo/channellist'} passHref>
                <h3 style={{ display: 'inline' }}>2.チャンネル一覧</h3>
                <p>SlackAPIを使用したチャンネル一覧表示※publicチャンネルのみ</p>
              </NextLink>
            </div>
            <br />

            <div className={styles.grid}>
              <NextLink href={'/rooms/slacklabo/emojilist'} passHref>
                <h3 style={{ display: 'inline' }}>3.slack絵文字検索</h3>
                <p>SlackAPIを使用したチャンネル一覧表示※publicチャンネルのみ</p>
              </NextLink>
            </div>
            <br />

            <div className={styles.grid}>
              <NextLink href={'/rooms/slacklabo/comments'} passHref>
                <h3 style={{ display: 'inline' }}>
                  4.チャンネルコメント数集計
                </h3>
                <p>
                  SlackAPIを使用したユーザ毎のコメント数集計結果表示※publicチャンネルのみ
                </p>
              </NextLink>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Slacklabo
