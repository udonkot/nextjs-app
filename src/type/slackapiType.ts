export type slackCannelType = {
  id: string
  name: string
}

export type slackUserType = {
  id: string
  name: string
  displayname: string
  realname: string
  unitname: string
  memo: string
}

export type slackEmojiType = {
  key: string
  value: string
}

export type slackCommentType = {
  name: string
  date: string
}

export type slackCommentSummaryType = {
  commentInfo: slackCommentType
  summary: number
}

export type slackCommentChannelSummaryType = {
  channelId: string
  slackCommentSummaryList: slackCommentSummaryType[]
}
