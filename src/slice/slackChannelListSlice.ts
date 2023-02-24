import { slackCannelType } from "@/pages/type/slackapiType";
import {createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SlackChannelState = {
  slackChannelList: slackCannelType[]
}


export const initialState: SlackChannelState= {
  slackChannelList: [],
}

const slackUserSlice = createSlice({
  name: 'SlackChannel',
  initialState,
  reducers: {
    setState: (state: SlackChannelState, action: PayloadAction<SlackChannelState>) => {
      Object.assign(state, action.payload as SlackChannelState)
    },
    replaceState: (_state, action: PayloadAction<SlackChannelState>) => action.payload,
    initialState: () => initialState
  }
});

export const {reducer} =slackUserSlice
export const {setState} = slackUserSlice.actions
