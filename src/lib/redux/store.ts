import loadingSlice from '@/lib/redux/features/loading/loadingSlice'
import messagesSlice from '@/lib/redux/features/messages/messagesSlice'
import { configureStore } from '@reduxjs/toolkit'
import cartIdSlice from '@/lib/redux/features/cart/cartIdSlice'
import tokenSlice from '@/lib/redux/features/auth/tokenSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesSlice,
      loading: loadingSlice,
      cartId: cartIdSlice,
      token: tokenSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
