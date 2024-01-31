import loadingSlice from '@/lib/redux/features/loading/loadingSlice'
import messagesSlice from '@/lib/redux/features/messages/messagesSlice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesSlice,
      loading: loadingSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
