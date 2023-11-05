import { RootState } from '@/store/createStore'
import {
  slackCannelType,
  slackCommentSummaryType,
  slackCommentChannelSummaryType,
  slackUserType
} from '@/type/slackapiType'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelList } from './channellist'
import { setState as setStateSlackChannel } from 'src/slice/slackChannelListSlice'
import { setState as setStateSlackUser } from 'src/slice/slackUserListSlice'
import { setState as setStateSlackCommentSummary } from 'src/slice/slackCommentSummaryListSlice'
import { getUserList } from './userlist'
import SlackChannelSelect from '@/components/presentational/atoms/Slack/SlackChannnelSelect'
import {
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
import SL_CommentSummary from '@/components/container/template/SlackLabo/Comments/SL_CommentSummary'

/**
 * Slackチャンネル一覧取得API
 * @returns
 */
export const getCommentSummary = async (
  channelId: string,
  summaryType?: string
) => {
  let url = '/api/slackapi/commentsummary?channelid='.concat(channelId)
  if (summaryType) {
    url = url.concat('&summarytype=', summaryType)
  }

  const response = await fetch(url)
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
export const CommentSummary = (props: PropType) => {
  return (
    <>
      <SL_CommentSummary channelId={''} />
    </>
  )
}

export default CommentSummary
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
