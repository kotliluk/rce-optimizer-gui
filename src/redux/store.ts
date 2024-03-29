import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import { Dispatch, Store } from '@reduxjs/toolkit'

import { RootState } from './state'
import { Actions } from './actions'
import { reducer as pageReducer } from './page/reducer'
import { initPage } from './page/actions'


export const store: Store<RootState, Actions> = configureStore({
  reducer: combineReducers({
    page: pageReducer,
  }),
  // to ignore non-serializable Date field
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

store.dispatch(initPage())

export type AppDispatch = Dispatch<Actions>
