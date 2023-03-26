import { slackUserType } from '@/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { RootState } from 'src/store/createStore'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Input,
  Radio
} from '@chakra-ui/react'

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
            <TableContainer overflowX="unset" overflowY="unset">
              <Table variant="simple" colorScheme="teal">
                <Thead position="sticky" top={0} zIndex="docked">
                  <Tr bg="gray.200">
                    <Td>No</Td>
                    <Td>ユニット名</Td>
                    <Td>氏名(英字)</Td>
                    <Td>氏名(漢字)</Td>
                    <Td>メモ</Td>
                    <Td>メールアカウント(ユーザ)</Td>
                    <Td>SLACK ID</Td>
                  </Tr>
                </Thead>
                <Tbody>{dispUserList()}</Tbody>
              </Table>
            </TableContainer>
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
