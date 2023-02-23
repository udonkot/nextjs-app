import { useState } from 'react'
import { userListType } from '../../api/slackapi/userlist'

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
  const [userList, setUserList] = useState<userListType[]>([])
  const [showTrial01Display, setShowTrial01Display] = useState(false)

  const showTrial01 = async () => {
    const users = (await getUserList()) as userListType[]
    setUserList(users)
    setShowTrial01Display(!showTrial01Display)
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
        <div className="header">
          <h2>slack page!</h2>
        </div>
        <div className="body">
          <label onClick={() => showTrial01()}>
            Slackユーザ一覧※ラベルクリックで表示
          </label>
          <br />
          {showTrial01Display && (
            <>
              <table border={1}>
                <thead>
                  <td>No</td>
                  <td>ユニット名</td>
                  <td>氏名(英字)</td>
                  <td>氏名(漢字)</td>
                  <td>メモ</td>
                  <td>メールアカウント(ユーザ)</td>
                  <td>SLACK ID</td>
                </thead>
                <tbody>{dispUserList()}</tbody>
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

export default UserList
