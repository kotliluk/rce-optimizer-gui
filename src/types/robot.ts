import { v4 as uuidV4 } from 'uuid'

import { Activity, newIdleActivity, newMovementActivity } from './activity'


export type Robot = {
  uuid: string,
  id: string,
  note: string,
  activities: Activity[],
  minActivitiesDuration: number,
  duplicatedId: boolean,
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
    minActivitiesDuration: 0,
    duplicatedId: false,
  }
}

const isUnexpectedActivityOnIndex = (a: Activity, i: number): boolean => {
  return (i % 2 === 0) ? a.type !== 'IDLE' : a.type === 'IDLE'
}

export const hasActivityOrderError = (robot: Robot): boolean => {
  if (robot.activities.length % 2 === 0) {
    return true
  }
  // @ts-expect-error - bad typing of reduce
  return robot.activities.reduce((agg, a, i) => agg || isUnexpectedActivityOnIndex(a, i), false)
}
