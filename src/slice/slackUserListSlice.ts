import { slackUserType } from "@/pages/type/slackapiType";
import {createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SlackUserState = {
  slackUserList: slackUserType[]
}


export const initialState: SlackUserState= {
  slackUserList: [],
}

const slackUserSlice = createSlice({
  name: 'SlackUser',
  initialState,
  reducers: {
    setState: (state: SlackUserState, action: PayloadAction<SlackUserState>) => {
      Object.assign(state, action.payload as SlackUserState)
    },
    replaceState: (_state, action: PayloadAction<SlackUserState>) => action.payload,
    initialState: () => initialState
  }
});

export const {reducer} =slackUserSlice
export const {setState} = slackUserSlice.actions
