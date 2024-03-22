import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    update(state: string, action: PayloadAction<string>) {
      state = localStorage.getItem('cartId') || ''

      window.addEventListener('cartUpdated', () => {
        state = localStorage.getItem('cartId') || ''
      })

      return state
    },
  },
})

export const { update } = cartSlice.actions

export default cartSlice.reducer
