import { RootState } from '@/store/createStore'
import { slackCannelType } from '@/type/slackapiType'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getChannelList } from './channellist'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'

type PropType = {
  channelId: string
}
const CommentSummary = (props: PropType) => {
  // storeから取得
  const slackChannel = useSelector(
    (state: RootState) => state.slackChannel.slackChannelList
  )

  // useState
  const [channelList, setChannelList] = useState<slackCannelType[]>([])

  const [showSummary, setShowSummary] = useState<boolean>(false)

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

  return (
    <>
      <></>
      {channelList.length > 0 && <div>セレクトボックス表示</div>}
      {showSummary && <div>グラフ表示</div>}
    </>
  )
}

export default CommentSummary
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
