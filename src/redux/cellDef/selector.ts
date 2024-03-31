import { RootState } from '../state'
import { CellInfo } from '../../types/cellInfo'
import { Robot } from '../../types/robot'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'


export const selectCellInfo = (state: RootState): CellInfo => {
  return state.cellDef.cellInfo
}

export const selectRobots = (state: RootState): Robot[] => {
  return state.cellDef.robots
}

export const selectTimeOffsets = (state: RootState): TimeOffset[] => {
  return state.cellDef.timeOffsets
}

export const selectCollisions = (state: RootState): Collision[] => {
  return state.cellDef.collisions
}
