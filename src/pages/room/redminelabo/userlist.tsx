import { useState } from 'react'
import { userListType } from '../../api/redmine/userlist'

/**
 * Redmineユーザ一覧取得API
 * @returns
 */
const getUserList = async () => {
  const response = await fetch('/api/redmine/userlist')
  const data = await response.json()
  return data
}

/**
 * Redmineユーザ一覧画面
 * @returns
 */
export const UserList = () => {
  const [userList, setUserList] = useState<userListType>([])
  const [showTrial01Display, setShowTrial01Display] = useState(false)

  const showTrial01 = async () => {
    const res = (await getUserList()) as userListType
    setUserList(res)
    setShowTrial01Display(!showTrial01Display)
  }

  const dispUserList = () => {
    const dataList: JSX.Element[] = []
    console.log(userList)
    userList.users.forEach((data, idx) => {
      dataList.push(
        <tr key={idx}>
          <td>{idx}</td>
          <td>
            {data.lastname} {data.firstname}
          </td>
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
          <h2>redmine page!</h2>
        </div>
        <div className="body">
          <label onClick={() => showTrial01()}>
            Redmineユーザ一覧※ラベルクリックで表示
          </label>
          <br />
          {showTrial01Display && (
            <>
              <table border={1}>
                <thead>
                  <td>No</td>
                  <td>名前</td>
                  <td>REDMINE ID</td>
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
