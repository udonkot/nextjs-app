import { slackUserType } from '@/type/slackapiType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type appHeaderState = {
  title: string
}

export const initialState: appHeaderState = {
  title: ''
}

const appHeaderSlice = createSlice({
  name: 'AppHeader',
  initialState,
  reducers: {
    setState: (
      state: appHeaderState,
      action: PayloadAction<appHeaderState>
    ) => {
      Object.assign(state, action.payload as appHeaderState)
    },
    replaceState: (_state, action: PayloadAction<appHeaderState>) =>
      action.payload,
    initialState: () => initialState
  }
})

export const { reducer } = appHeaderSlice
export const { setState } = appHeaderSlice.actions
