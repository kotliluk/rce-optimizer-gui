import { newRobot, Robot } from '../../types/robot'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'
import { CellInfo } from '../../types/cellInfo'
import { ActivityShort } from '../../types/activity'


export interface State {
  cellInfo: CellInfo
  robots: Robot[]
  timeOffsets: TimeOffset[]
  collisions: Collision[]
  checked: 'NO' | 'OK' | 'ERROR'
  activities: ActivityShort[]
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
  timeOffsets: [],
  collisions: [],
  checked: 'NO',
  activities: [],
}
