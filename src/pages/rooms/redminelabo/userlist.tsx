import { redmineUserResponseType, redmineUserType } from '@/type/redmineapiType'
import { RootState } from '@/store/createStore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState as setStateRedmineUser } from 'src/slice/redmineUserListSlice'

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
  // storeから取得
  const redmineUser = useSelector(
    (state: RootState) => state.redmineUser.redmineUserList
  )
  const dispatch = useDispatch()

  // useState
  const [userList, setUserList] = useState<redmineUserType[]>([])

  // 初期表示後の処理
  useEffect(() => {
    if (redmineUser.length > 0) {
      setUserList(redmineUser)
    } else {
      // storeから取得できない場合はAPI呼び出し
      getRedmineUser()
    }
  }, [])

  const getRedmineUser = async () => {
    const res = (await getUserList()) as redmineUserResponseType
    setUserList(res.users)
    // storeにセット
    dispatch(
      setStateRedmineUser({
        redmineUserList: res.users
      })
    )
  }

  const dispUserList = () => {
    const dataList: JSX.Element[] = []
    console.log(userList)
    if (userList.length > 0) {
      userList?.forEach((data, idx) => {
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
    }
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
                  <td>名前</td>
                  <td>REDMINE ID</td>
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
