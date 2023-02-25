import {
  configureStore,
} from '@reduxjs/toolkit'
import { reducer as SlackUserReducer} from 'src/slice/slackUserListSlice'
import { reducer as SlackChannelReducer} from 'src/slice/slackChannelListSlice'
import { reducer as RedmineUserReducer} from 'src/slice/redmineUserListSlice'

const reducer = {
  slackUser: SlackUserReducer,
  slackChannel: SlackChannelReducer,
  redmineUser: RedmineUserReducer,
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>

export default store
