import { newRobot, Robot } from '../../types/robot'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'
import { CellInfo } from '../../types/cellInfo'
import { ActivityShort } from '../../types/activity'
import { CheckState } from '../../types/checkState'


export interface State {
  cellInfo: CellInfo
  robots: Robot[]
  robotsChecked: CheckState
  timeOffsets: TimeOffset[]
  timeOffsetsChecked: CheckState
  collisions: Collision[]
  collisionsChecked: CheckState
  activities: ActivityShort[]
  allChecked: string // "NO", "OK", or error type
}

export const initialState: State = {
  cellInfo: {
    name: 'RoboticCell01',
    note: '',
    cycleTime: 10.0,
  },
  robots: [
    newRobot(),
  ],
  robotsChecked: 'NO',
  timeOffsets: [],
  timeOffsetsChecked: 'NO',
  collisions: [],
  collisionsChecked: 'NO',
  activities: [],
  allChecked: 'NO',
}
