import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    update(state: string, action: PayloadAction<string>) {
      state = localStorage.getItem('magentoToken') || ''

      window.addEventListener('tokenUpdated', () => {
        state = localStorage.getItem('magentoToken') || ''
      })

      return state
    },
  },
})

export const { update } = tokenSlice.actions

export default tokenSlice.reducer
