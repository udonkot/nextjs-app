import { RootState } from '@/store/createStore'
import {
  slackCannelType,
  slackCommentSummaryType,
  slackCommentChannelSummaryType,
  slackUserType
} from '@/type/slackapiType'
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelList } from 'src/pages/rooms/slacklabo/channellist'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { setState as setStateSlackCommentSummary } from 'src/slice/slackCommentSummaryListSlice'
import { getUserList } from 'src/pages/rooms/slacklabo/userlist'
import SlackChannelSelect from '@/components/presentational/atoms/Slack/SlackChannnelSelect'
import {
  Button,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr
} from '@chakra-ui/react'
import YmdSelect from '@/components/presentational/atoms/Date/YmdSelect'
import { convertDate } from '@/util/slackapiUtil'

/**
 * Slackチャンネル一覧取得API
 * @returns
 */
export const getCommentSummary = async (
  channelId: string,
  startTime?: string,
  endTime?: string,
  searchTime?: string
) => {
  let reqParam = 'channelid='.concat(channelId)

  if (startTime) {
    reqParam = reqParam.concat('&startTime=', startTime)
  }

  if (endTime !== undefined) {
    reqParam = reqParam.concat('&endTime=', endTime)
  }

  if (searchTime !== undefined) {
    reqParam = reqParam.concat('&searchTime=', searchTime)
  }

  const response = await fetch('/api/slackapi/commentsummary?'.concat(reqParam))
  console.log('/api/slackapi/commentsummary?'.concat(reqParam))
  const data = await response.json()
  return data
}

// 画面表示項目の格納用
type dispSummaryType = {
  ym: string
  name: string
  cnt: number
}

type PropType = {
  channelId: string
}
export const SL_CommentSummary = (props: PropType) => {
  // storeから取得
  const slackChannel = useSelector(
    (state: RootState) => state.slackChannel.slackChannelList
  )
  const slackUser = useSelector(
    (state: RootState) => state.slackUser.slackUserList
  )
  const dispatch = useDispatch()

  // useState
  // チャンネル一覧
  const [channelList, setChannelList] = useState<slackCannelType[]>([])
  // ユーザ一覧
  const [userList, setUserList] = useState<slackUserType[]>([])
  // 取得した集計結果格納用
  const [allChannelSummaryList, setAllChannelSummaryList] = useState<
    slackCommentChannelSummaryType[]
  >([])
  // 表示チャンネルの集計結果格納用
  const [commentSummaryList, setCommentSummaryList] = useState<
    slackCommentSummaryType[]
  >([])

  const [showRadio, setShowRadio] = useState<boolean>(false)
  const [summaryRange, setSummaryRange] = useState('')

  const [showSummary, setShowSummary] = useState<boolean>(false)

  const [isLoading, setLoading] = useState<boolean>(false)

  const [channelId, setChannelId] = useState<string>('')
  const [targetDate, setTargetDate] = useState<Date>()

  // 初期表示後の処理
  useEffect(() => {
    const getData = async () => {
      // チャンネル
      if (slackChannel.length > 0) {
        setChannelList(slackChannel)
      } else {
        // storeから取得できない場合はAPI呼び出し
        await getSlackChannel()
      }

      // ユーザ
      if (slackUser.length > 0) {
        setUserList(slackUser)
      } else {
        // storeから取得できない場合はAPI呼び出し
        await getSlackUser()
      }
    }
    getData()
  }, [])

  // チャンネル情報取得
  const getSlackChannel = async () => {
    const channels = (await getChannelList()) as slackCannelType[]
    setChannelList(channels)
    dispatch(
      setStateSlackChannel({
        slackChannelList: channels
      })
    )
  }

  // ユーザ情報取得
  const getSlackUser = async () => {
    const users = (await getUserList()) as slackUserType[]
    setUserList(users)
    dispatch(
      setStateSlackUser({
        slackUserList: users
      })
    )
  }

  // 集計対象チャンネル選択
  const channelSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setShowSummary(false)
    setChannelId(event.target.value)
  }

  // 日付、ユーザ毎に集計
  const dispDateUserSummary = () => {
    let wrkDispSummaryList: dispSummaryType[] = []
    commentSummaryList.forEach((data, idx) => {
      const dispIdx = wrkDispSummaryList.findIndex(
        (dispData) =>
          dispData.name === data.commentInfo.name &&
          dispData.ym === data.commentInfo.date.slice(0, 7)
      )

      if (dispIdx > -1) {
        wrkDispSummaryList[dispIdx].cnt =
          wrkDispSummaryList[dispIdx].cnt + data.summary
      } else {
        wrkDispSummaryList.push({
          name: data.commentInfo.name,
          ym: data.commentInfo.date.slice(0, 7),
          cnt: data.summary
        })
      }
    })

    const displaySummary = wrkDispSummaryList.map((data) => {
      let wrkData = data
      const userData = userList.find((user) => user.id === wrkData.name)
      wrkData.name = userData?.name ?? ''
      return wrkData
    })
    displaySummary.sort((data1, data2) => {
      if (data1.ym !== data2.ym) {
        if (data1.ym > data2.ym) return -1
        if (data1.ym < data2.ym) return 1
      }
      if (data1.name > data2.name) return 1
      return -1
    })

    const dataList: JSX.Element[] = []
    displaySummary.forEach((data, idx) => {
      dataList.push(
        <Tr key={idx}>
          <Td>{data.ym}</Td>
          <Td>{data.name}</Td>
          <Td>{data.cnt}</Td>
        </Tr>
      )
    })

    return dataList
  }
  /**
   * TODO
   * セレクトボックスで選択したらAPI呼び出しでコメント集計結果を取得
   * パラメータで取得期間を分ける
   * 過去3か月、今週、今月くらい
   * 呼び出し中はグラフとラジオボタン非表示
   * 呼び出した結果をstoreに保存
   * 更新できたらラジオボタンとグラフ表示
   * ラジオボタン変更したら集計範囲も変更して再表示
   *
   *
   */

  const radioChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSummaryRange(event.target.value)
  }

  /**
   * 実行ボタン押下
   * @param event
   * @returns
   */
  const doProc: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true)
    setShowSummary(false)

    let startTime = ''
    let endTime = ''
    let searchTime = ''

    if (targetDate) {
      // 取得開始日
      const startDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() - 2,
        0,
        23,
        59,
        59
      )
      console.log('startDate;' + startDate)
      startTime = String(startDate.getTime())
      startTime = startTime.slice(0, 10).concat('.', startTime.slice(10))

      // 取得終了日
      const endDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        1
      )
      console.log('endDate;' + endDate)
      endTime = String(endDate.getTime())
      endTime = endTime.slice(0, 10).concat('.', endTime.slice(10))

      // 検索開始日
      const searchDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() - 2,
        0,
        23,
        59,
        59
      )
      console.log('searchDate;' + searchDate)
      searchTime = String(searchDate.getTime())
      searchTime = searchTime.slice(0, 10).concat('.', searchTime.slice(10))
    } else {
      return
    }

    // 既に取得済みか確認
    const channelSummary = allChannelSummaryList.find((summary) => {
      summary.channelId === channelId
    })

    if (channelSummary) {
      // あればstate更新
      setCommentSummaryList(channelSummary.slackCommentSummaryList)
    } else {
      // なければ取得してstate更新
      const summary = (await getCommentSummary(
        channelId,
        startTime !== '' ? startTime : undefined,
        endTime !== '' ? endTime : undefined,
        searchTime !== '' ? searchTime : undefined
      )) as slackCommentSummaryType[]
      setCommentSummaryList(summary)

      const newSummary: slackCommentChannelSummaryType = {
        channelId: channelId,
        slackCommentSummaryList: summary
      }

      const wrkSummaryList = allChannelSummaryList
      wrkSummaryList.push(newSummary)

      setAllChannelSummaryList(wrkSummaryList)
    }

    setShowSummary(true)
    setLoading(false)
    // setShowRadio(true)
  }

  useEffect(() => {}, [summaryRange])

  return (
    <>
      {channelList.length > 0 && (
        <div>
          <label>１．集計対象のチャンネルを選択してください。</label>
          <br />
          <SlackChannelSelect
            channelInfo={channelList}
            onChange={channelSelectChange}
          />
          <br />
          <label>２．集計期間を選択してください。</label>
          <br />
          <YmdSelect setTargetDate={setTargetDate} />
          <br />
          <label>３．ボタンを押してください</label>
          <br />
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            loadingText="実行中"
            onClick={doProc}
          >
            実行
          </Button>
          <br />
        </div>
      )}

      {showRadio && (
        <div>
          選択されました
          <br />
          <br />
          <label>2.検索条件：</label>
          <br />
          {/* <RadioGroup onChange={setSummaryRange} value={summaryRange}>
            <Stack direction="row">
              <Radio value="all">全期間</Radio>
              <Radio value="bf3m">3ヶ月前</Radio>
              <Radio value="bf2m">2ヶ月前</Radio>
              <Radio value="bf1m">1ヶ月前</Radio>
              <Radio value="month">今月</Radio>
              <Radio value="week">今週</Radio>
            </Stack>
          </RadioGroup> */}
          <br />
        </div>
      )}
      {showSummary && commentSummaryList && (
        <TableContainer overflowX="unset" overflowY="unset">
          <Table variant="simple" colorScheme="teal">
            <Thead position="sticky" top={0} zIndex="docked">
              <Tr bg="gray.200">
                <Td>日付</Td>
                <Td>名前</Td>
                <Td>コメント数</Td>
              </Tr>
            </Thead>
            <Tbody>{dispDateUserSummary()}</Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default SL_CommentSummary
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
