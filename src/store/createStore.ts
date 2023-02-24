import {
  configureStore,
} from '@reduxjs/toolkit'
import { reducer as SlackUserReducer} from 'src/slice/slackUserListSlice'
import { reducer as SlackChannelReducer} from 'src/slice/slackChannelListSlice'

const reducer = {
  slackUser: SlackUserReducer,
  slackChannel: SlackChannelReducer,
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>

export default store
