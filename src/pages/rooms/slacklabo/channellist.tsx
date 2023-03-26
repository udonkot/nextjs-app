import { slackCannelType } from '@/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'
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
 * Slackチャンネル一覧取得API
 * @returns
 */
const getChannelList = async () => {
  const response = await fetch('/api/slackapi/channellist')
  const data = await response.json()
  return data
}

/**
 * Slackチャンネル一覧画面
 * @returns
 */
export const Channellist = () => {
  // storeから取得
  const slackChannel = useSelector(
    (state: RootState) => state.slackChannel.slackChannelList
  )
  const dispatch = useDispatch()

  // useState
  const [chauserList, setChannelList] = useState<slackCannelType[]>([])

  // 初期表示後の処理
  useEffect(() => {
    if (slackChannel.length > 0) {
      setChannelList(slackChannel)
    } else {
      // storeから取得できない場合はAPI呼び出し
      getSlackChannel()
    }
  }, [])

  const getSlackChannel = async () => {
    const channels = (await getChannelList()) as slackCannelType[]
    setChannelList(channels)
    dispatch(
      setStateSlackChannel({
        slackChannelList: channels
      })
    )
  }

  const dispChannelList = () => {
    const dataList: JSX.Element[] = []
    chauserList.forEach((data, idx) => {
      dataList.push(
        <tr key={idx}>
          <td>{idx}</td>
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
                    <Td>Name</Td>
                    <Td>ID</Td>
                  </Tr>
                </Thead>
                <Tbody>{dispChannelList()}</Tbody>
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

export default Channellist
