import { redmineUserType } from "@/type/redmineapiType";
import {createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RedmineUserState = {
  redmineUserList: redmineUserType[]
}


export const initialState: RedmineUserState= {
  redmineUserList: [],
}

const redmineUserSlice = createSlice({
  name: 'RedmineUser',
  initialState,
  reducers: {
    setState: (state: RedmineUserState, action: PayloadAction<RedmineUserState>) => {
      Object.assign(state, action.payload as RedmineUserState)
    },
    replaceState: (_state, action: PayloadAction<RedmineUserState>) => action.payload,
    initialState: () => initialState
  }
});

export const {reducer} =redmineUserSlice
export const {setState} = redmineUserSlice.actions
