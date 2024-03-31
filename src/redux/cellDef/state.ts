import { newRobot, Robot } from '../../types/robot'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'
import { CellInfo } from '../../types/cellInfo'


export interface State {
  cellInfo: CellInfo
  robots: Robot[]
  timeOffsets: TimeOffset[]
  collisions: Collision[]
}

export const initialState: State = {
  cellInfo: {
    name: 'RoboticCell01',
    note: '',
    cycleTime: 10.0,
  },
  robots: [
    newRobot('r01'),
  ],
  timeOffsets: [],
  collisions: [],
}
