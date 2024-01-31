import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading: (state: boolean, action: PayloadAction<boolean>) => {
      state = action.payload

      return state
    },
  },
})

export const { setLoading } = messagesSlice.actions

export default messagesSlice.reducer
