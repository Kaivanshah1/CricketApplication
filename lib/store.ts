import { configureStore } from '@reduxjs/toolkit'
import teamsReducer from './teamSlice'

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch