import { getChannelList } from '@/pages/rooms/slacklabo/channellist'
import { getCommentSummary } from '@/pages/rooms/slacklabo/comments'
import { RootState } from '@/store/createStore'
import {
  slackCannelType,
  slackCommentChannelSummaryType,
  slackCommentSummaryType,
  slackUserType
} from '@/type/slackapiType'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { setState as setStateSlackCommentSummary } from 'src/slice/slackCommentSummaryListSlice'
import { getUserList } from '@/pages/rooms/slacklabo/userlist'
import { getYYYYMMList } from '@/util/slackapiUtil'

type dispType = {
  yyyymm: string
  commentNum: number
  channelId: string
}

/**
 * コメント集計
 * @returns
 */
const CommentSummary = () => {
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

  const [dispDataList, setDispDataList] = useState<dispType[]>([])
  const [dispDataListBF, setDispDataListBF] = useState<dispType[]>([])

  const [allCommentNum, setAllCommentNum] = useState<number>(0)

  // env
  // 集計対象チャンネルID
  // const summaryChannnelList = process.env.DXSERVICE_SUMMARY_CHANNELID?.split(
  //   ','
  // ) ?? ['C03408J995K', 'C051HQG4MGU', 'C02D6RW3N83']
  // console.log(process.env.DXSERVICE_SUMMARY_CHANNELID)
  // const summaryChannnelList = ['C03408J995K']

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

  console.log('start component')

  // useEffect
  useEffect(() => {
    const wrkSummaryList: slackCommentChannelSummaryType[] = []

    const getData = async () => {
      // チャンネル
      // if (slackChannel.length > 0) {
      //   setChannelList(slackChannel)
      // } else {
      //   // storeから取得できない場合はAPI呼び出し
      //   await getSlackChannel()
      // }

      // // ユーザ
      // if (slackUser.length > 0) {
      //   setUserList(slackUser)
      // } else {
      //   // storeから取得できない場合はAPI呼び出し
      //   await getSlackUser()
      // }

      const getData = async (channelId: string) => {
        const summary = (await getCommentSummary(
          channelId,
          'month'
        )) as slackCommentSummaryType[]

        const newSummary: slackCommentChannelSummaryType = {
          channelId: channelId,
          slackCommentSummaryList: summary
        }

        console.log(newSummary.slackCommentSummaryList.length)

        wrkSummaryList.push(newSummary)
      }

      // コメント
      const sleep = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve
          }, 10)
        })

      console.log('start getdata')
      await getData('C03408J995K')
      await getData('C051HQG4MGU')
      await getData('C02D6RW3N83')
      await getData('C04Q3JHA4M7')
      await getData('C04N8M97HGW')

      // 表示用に整形
      // 今月分だけ出してみる

      // ユニット全体のコメント数
      let wrkAllCommentNum = 0
      const wrkDispList: dispType[] = []

      console.log(getYYYYMMList())

      // チャンネル毎の集計を月毎に集計
      wrkSummaryList.forEach((sum) => {
        console.log('-----'.concat(sum.channelId, '-----'))

        // TODO:今月分だけを取得してグルーピング
        let chlcommentnum = 0
        sum.slackCommentSummaryList
          .filter((data) => data.commentInfo.date.includes('2023/04'))
          .forEach((commentsum) => {
            chlcommentnum += commentsum.summary
          })
        wrkDispList.push({
          channelId: sum.channelId,
          commentNum: chlcommentnum,
          yyyymm: '2023/04'
        })
        wrkAllCommentNum += chlcommentnum
      })
      wrkDispList.push({
        channelId: 'ALL',
        commentNum: wrkAllCommentNum,
        yyyymm: '2023/04'
      })

      console.log(wrkAllCommentNum)

      wrkDispList.sort((data1, data2) => {
        if (data1.channelId === 'ALL' || data2.channelId === 'ALL') {
          return -1
        }
        return 1
      })

      setDispDataList(wrkDispList)

      setAllCommentNum(wrkAllCommentNum)
    }
    void getData()
  }, [])

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

  const createDispData = (dataList: dispType[]) => {
    const dispElement: JSX.Element[] = []
    dataList.forEach((data) => {
      if (data.channelId === 'ALL') {
        const percent = (allCommentNum / 400) * 100

        dispElement.push(
          <CircularProgress
            value={Number(percent.toFixed(2))}
            color="green.400"
            size="300px"
          >
            <CircularProgressLabel fontSize={15}>
              4月合計
              <br />
              {allCommentNum} / 400
              <br />
              {Number(percent.toFixed(2))}%
            </CircularProgressLabel>
          </CircularProgress>
        )
      } else {
        const percent = (data.commentNum / allCommentNum) * 100

        dispElement.push(
          <CircularProgress
            value={Number(percent.toFixed(2))}
            color="orange.400"
            size="100px"
          >
            <CircularProgressLabel fontSize={10}>
              {data.channelId}
              <br />
              {data.commentNum}
              <br />
              {Number(percent.toFixed(2))}%
              <br />
            </CircularProgressLabel>
          </CircularProgress>
        )
      }
    })

    return dispElement
  }

  return <>{createDispData(dispDataList)}</>
}

export default CommentSummary
function setUserList(slackUser: import('@/type/slackapiType').slackUserType[]) {
  throw new Error('Function not implemented.')
}
