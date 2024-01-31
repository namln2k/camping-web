import { configureStore } from '@reduxjs/toolkit'
import messagesSlice from '@/lib/redux/features/messages/messagesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
