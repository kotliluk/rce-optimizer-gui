import {
  ThunkDispatch as ReduxThunkDispatch,
  ThunkAction as ReduxThunkAction,
} from 'redux-thunk'

import { Actions } from './actions'
import { RootState } from './state'


export type AppThunkDispatch = ReduxThunkDispatch<RootState, unknown, Actions>
export type AppThunkAction<T = void> = ReduxThunkAction<T, RootState, unknown, Actions>
