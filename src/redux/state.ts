import { State as CellDefState } from './cellDef/state'
import { State as PageState } from './page/state'


export type RootState = {
  cellDef: CellDefState,
  page: PageState,
}
