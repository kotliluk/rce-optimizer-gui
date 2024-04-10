import { RootState } from '../state'
import { CellInfo } from '../../types/cellInfo'
import { Robot } from '../../types/robot'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'
import { ActivityShort } from '../../types/activity'
import { CheckState } from '../../types/checkState'


export const selectCellInfo = (state: RootState): CellInfo => {
  return state.cellDef.cellInfo
}

export const selectRobots = (state: RootState): Robot[] => {
  return state.cellDef.robots
}

export const selectRobotsChecked = (state: RootState): CheckState => {
  return state.cellDef.robotsChecked
}

export const selectTimeOffsets = (state: RootState): TimeOffset[] => {
  return state.cellDef.timeOffsets
}

export const selectTimeOffsetsChecked = (state: RootState): CheckState => {
  return state.cellDef.timeOffsetsChecked
}

export const selectCollisions = (state: RootState): Collision[] => {
  return state.cellDef.collisions
}

export const selectCollisionsChecked = (state: RootState): CheckState => {
  return state.cellDef.collisionsChecked
}

export const selectActivities = (state: RootState): ActivityShort[] => {
  return state.cellDef.activities
}

export const selectAllChecked = (state: RootState): string => {
  return state.cellDef.allChecked
}
