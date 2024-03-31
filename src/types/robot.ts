import { v4 as uuidV4 } from 'uuid'

import { Activity, newIdleActivity, newMovementActivity } from './activity'


export type Robot = {
  uuid: string,
  id: string,
  note: string,
  activities: Activity[],
  duplicatedId: string,
}

export type RobotInfo = Pick<Robot, 'uuid' | 'id' | 'note'>

export const newRobot = (): Robot => {
  return {
    uuid: uuidV4(),
    id: '',
    note: '',
    activities: [
      newIdleActivity(),
      newMovementActivity(),
      newIdleActivity(),
    ],
    duplicatedId: '',
  }
}
