import { v4 as uuidV4 } from 'uuid'

import { Activity, newIdleActivity, newMovementActivity } from './activity'


export type Robot = {
  uuid: string,
  id: string,
  note: string,
  activities: Activity[],
}

export type RobotInfo = Pick<Robot, 'uuid' | 'id' | 'note'>

export const newRobot = (id = ''): Robot => {
  return {
    uuid: uuidV4(),
    id,
    note: '',
    activities: [
      newIdleActivity(`${id}_p01`),
      newMovementActivity(`${id}_m01`),
      newIdleActivity(`${id}_p02`),
    ],
  }
}
