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
  equalStartForMovement: boolean,
  equalEndForMovement: boolean,
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
}

export type Activity = IdleActivity | MovementActivity | WorkActivity

export type ActivityShort = {
  uuid: string,
  robotId: string,
  id: string,
  text: string,
}

export const newIdleActivity = (): IdleActivity => {
  return {
    uuid: uuidV4(),
    type: 'IDLE',
    id: '',
    note: '',
    position: { x: 0, y: 0, z: 0 },
    duplicatedId: false,
    equalStartForMovement: true,
    equalEndForMovement: true,
  }
}

export const newMovementActivity = (uuid?: string): MovementActivity => {
  return {
    uuid: uuid ?? uuidV4(),
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

export const newWorkActivity = (uuid?: string): WorkActivity => {
  return {
    uuid: uuid ?? uuidV4(),
    type: 'WORK',
    id: '',
    note: '',
    duration: 5,
    fixedStartTime: undefined,
    duplicatedId: false,
  }
}

export const getMinDuration = (a: Activity): number => {
  if (a.type === 'IDLE') {
    return 0
  }
  if (a.type === 'MOVEMENT') {
    return a.minDuration
  }
  // if (a.type === 'WORK')
  return a.duration
}
