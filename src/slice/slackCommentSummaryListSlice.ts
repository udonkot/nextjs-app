import { slackCommentChannelSummaryType } from '@/type/slackapiType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SlackCommentSummaryState = {
  summary: slackCommentChannelSummaryType
}

export const initialState: SlackCommentSummaryState[] = []

const slackCommentSummarySlice = createSlice({
  name: 'SlackCommentSummary',
  initialState,
  reducers: {
    setState: (
      state: SlackCommentSummaryState[],
      action: PayloadAction<SlackCommentSummaryState[]>
    ) => {
      Object.assign(state, action.payload as SlackCommentSummaryState[])
    },
    replaceState: (_state, action: PayloadAction<SlackCommentSummaryState[]>) =>
      action.payload,
    initialState: () => initialState
  }
})

export const { reducer } = slackCommentSummarySlice
export const { setState } = slackCommentSummarySlice.actions
