// import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux'
// import type { AppDispatch, AppStore, RootState } from './index'

// export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export const useAppStore = () => useStore<AppStore>()



import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

