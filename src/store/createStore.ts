import { configureStore } from '@reduxjs/toolkit'
import { reducer as SlackUserReducer } from 'src/slice/slackUserListSlice'
import { reducer as SlackChannelReducer } from 'src/slice/slackChannelListSlice'
import { reducer as RedmineUserReducer } from 'src/slice/redmineUserListSlice'
import { reducer as AppHeaderReducer } from 'src/slice/appHeaderSlice'

const reducer = {
  slackUser: SlackUserReducer,
  slackChannel: SlackChannelReducer,
  redmineUser: RedmineUserReducer,
  appHeader: AppHeaderReducer
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>

export default store
