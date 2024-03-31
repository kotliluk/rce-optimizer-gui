import { v4 as uuidV4 } from 'uuid'

import { Position } from './position'


type ActivityCommon<T extends string> = {
  uuid: string,
  type: T,
  id: string,
  note: string,
  duplicatedId: boolean,
}

export type IdleActivity = ActivityCommon<'IDLE'> & {
  position: Position,
}

export type MovementActivity = ActivityCommon<'MOVEMENT'> & {
  minDuration: number,
  maxDuration: number,
  fixedStartTime: number | undefined,
  fixedEndTime: number | undefined,
}

export type WorkActivity = ActivityCommon<'WORK'> & {
  duration: number,
  fixedStartTime: number | undefined,
  fixedEndTime: number | undefined,
}

export type Activity = IdleActivity | MovementActivity | WorkActivity

export const newIdleActivity = (): IdleActivity => {
  return {
    uuid: uuidV4(),
    type: 'IDLE',
    id: '',
    note: '',
    position: { x: 0, y: 0, z: 0 },
    duplicatedId: false,
  }
}

export const newMovementActivity = (): MovementActivity => {
  return {
    uuid: uuidV4(),
    type: 'MOVEMENT',
    id: '',
    note: '',
    minDuration: 1,
    maxDuration: 5,
    fixedStartTime: undefined,
    fixedEndTime: undefined,
    duplicatedId: false,
  }
}

export const newWorkActivity = (): WorkActivity => {
  return {
    uuid: uuidV4(),
    type: 'WORK',
    id: '',
    note: '',
    duration: 5,
    fixedStartTime: undefined,
    fixedEndTime: undefined,
    duplicatedId: false,
  }
}
