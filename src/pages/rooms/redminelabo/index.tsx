import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Userlist from './userlist'
import WeeklyReportCountList from './WeeklyReportCountList'
import NextLink from 'next/link'
import { useDispatch } from 'react-redux'
import { setAppHeaderArea } from '@/util/commonUtil'

/**
 *
 * @returns
 */
export const Redminelabo = () => {
  const [showReportCount, setShowReportCount] = useState(false)
  const [showReportCountMsg, setShowReportCountMsg] = useState('表示')
  const [showUser, setShowUser] = useState(false)
  const [showUserMsg, setshowUserMsg] = useState('表示')

  const dispatch = useDispatch()

  // storeにセット
  setAppHeaderArea('Redmine Labo Page', ['main'], dispatch)

  /**
   * 週報提出表示非表示ボタン切替
   */
  const changeShowReportCount = () => {
    if (!showReportCount) {
      setShowReportCountMsg('非表示')
    } else {
      setShowReportCountMsg('表示')
    }
    setShowReportCount(!showReportCount)
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
      <motion.div
        initial={{ opacity: 1, x: -10 }} // 初期状態
        animate={{ opacity: 1, x: 10 }} // マウント時
      >
        <div className="contents">
          <div className="header">
            <h2>RedmineLabo page!</h2>
            <br />
          </div>
          <div className="body">
            <div>
              <NextLink href={'/rooms/redminelabo/userlist'} passHref>
                <h3 style={{ display: 'inline' }}>1.ユーザ一覧</h3>
                <p>RedmineAPIを使用したユーザ一覧表示※Activeユーザのみ</p>
              </NextLink>
            </div>
            <br />

            <div>
              <NextLink
                href={'/rooms/redminelabo/WeeklyReportCountList'}
                passHref
              >
                <h3 style={{ display: 'inline' }}>2.週報提出数一覧</h3>
                <p>RedmineAPIを使用したユーザ一覧表示※Activeユーザのみ</p>
                <p>ユニット内の週報提出数表示</p>
              </NextLink>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Redminelabo
