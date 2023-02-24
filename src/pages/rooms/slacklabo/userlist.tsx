import { slackUserType } from '@/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { RootState } from 'src/store/createStore'

/**
 * Slackユーザ一覧取得API
 * @returns
 */
const getUserList = async () => {
  const response = await fetch('/api/slackapi/userlist')
  const data = await response.json()
  return data
}

/**
 * Slackユーザ一覧画面
 * @returns
 */
export const UserList = () => {
  // storeから取得
  const slackUser = useSelector(
    (state: RootState) => state.slackUser.slackUserList
  )
  const dispatch = useDispatch()

  // useState
  const [userList, setUserList] = useState<slackUserType[]>([])

  // 初期表示後の処理
  useEffect(() => {
    if (slackUser.length > 0) {
      setUserList(slackUser)
    } else {
      // storeから取得できない場合はAPI呼び出し
      getSlackUser()
    }
  }, [])

  // Slackユーザ取得
  const getSlackUser = async () => {
    const users = (await getUserList()) as slackUserType[]
    setUserList(users)
    // storeにセット
    dispatch(
      setStateSlackUser({
        slackUserList: users
      })
    )
  }

  const dispUserList = () => {
    const dataList: JSX.Element[] = []
    userList.forEach((data, idx) => {
      dataList.push(
        <tr key={idx}>
          <td>{idx}</td>
          <td>{data.unitname}</td>
          <td>{data.realname}</td>
          <td>{data.displayname}</td>
          <td>{data.memo}</td>
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
                  <td>ユニット名</td>
                  <td>氏名(英字)</td>
                  <td>氏名(漢字)</td>
                  <td>メモ</td>
                  <td>メールアカウント(ユーザ)</td>
                  <td>SLACK ID</td>
                </tr>
              </thead>
              <tbody>{dispUserList()}</tbody>
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

export default UserList
