import {
  DEFAULT_DURATION,
  DURATION_CHECK_INTERVAL,
  GlobalMessage,
  Message,
} from '@/types'
import { shortid } from '@/util'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: GlobalMessage[] = []

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: (state: GlobalMessage[], action: PayloadAction<Message>) => {
      // Add a default duration if not provided
      state.push({
        id: shortid(),
        duration: DEFAULT_DURATION,
        ...action.payload,
      })

      return state
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload)

      state.splice(index, 1)

      return state
    },
    subtractDuration: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload)
      const message = state[index]

      state.splice(index, 1, {
        ...message,
        duration: message?.duration
          ? message.duration - DURATION_CHECK_INTERVAL
          : 0,
      })

      return state
    },
  },
})

export const { add, remove, subtractDuration } = messagesSlice.actions

export default messagesSlice.reducer
