import { v4 as uuidV4 } from 'uuid'

import { Position } from './position'


type ActivityCommon<T extends string> = {
  uuid: string,
  type: T,
  id: string,
  note: string,
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

export const newIdleActivity = (id = ''): IdleActivity => {
  return {
    uuid: uuidV4(),
    type: 'IDLE',
    id,
    note: '',
    position: { x: 0, y: 0, z: 0 },
  }
}

export const newMovementActivity = (id = ''): MovementActivity => {
  return {
    uuid: uuidV4(),
    type: 'MOVEMENT',
    id,
    note: '',
    minDuration: 1,
    maxDuration: 5,
    fixedStartTime: undefined,
    fixedEndTime: undefined,
  }
}

export const newWorkActivity = (id = ''): WorkActivity => {
  return {
    uuid: uuidV4(),
    type: 'WORK',
    id,
    note: '',
    duration: 5,
    fixedStartTime: undefined,
    fixedEndTime: undefined,
  }
}
