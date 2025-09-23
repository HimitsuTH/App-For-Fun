import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'
import categorySlice from './slices/category.slice'

export const makeStore = configureStore({
    reducer: {
      user: userSlice,
      categoy: categorySlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
    }),
  })


// Infer the type of store
export type AppStore = typeof makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
