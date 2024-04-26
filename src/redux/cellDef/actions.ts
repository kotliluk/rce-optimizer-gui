import { Action } from 'redux'

import { AppThunkAction } from '../thunk'
import { CellInfo } from '../../types/cellInfo'
import { RobotInfo } from '../../types/robot'
import {
  Activity,
  IdleActivity,
  MovementActivity,
  newIdleActivity,
  newMovementActivity,
  newWorkActivity,
  WorkActivity,
} from '../../types/activity'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'
import { CellDefJSON } from '../../types/cellDefJson'


export type Actions = SetCellInfo | AddRobot | DeleteRobot | SetRobotInfo
| AddActivityOnIndex | DeleteActivity | SetActivityInfo | CheckRobots
| AddTimeOffset | DeleteTimeOffset | SetTimeOffsetInfo | CheckTimeOffsets
| AddCollision | DeleteCollision | SetCollisionInfo | CheckCollisions
| CheckExtra | SetCellDef


/** ******************* Set cell info *********************/

export const SET_CELL_INFO = 'cellDef/SET_CELL_INFO'

interface SetCellInfo extends Action<typeof SET_CELL_INFO> {
  payload: {
    cellInfo: CellInfo,
  }
}

export const setCellInfo = (cellInfo: CellInfo): SetCellInfo => {
  return {
    type: SET_CELL_INFO,
    payload: {
      cellInfo,
    },
  }
}

/** ******************* Add robot *********************/

export const ADD_ROBOT = 'cellDef/ADD_ROBOT'

interface AddRobot extends Action<typeof ADD_ROBOT> {
  payload: undefined
}

export const addRobot = (): AddRobot => {
  return {
    type: ADD_ROBOT,
    payload: undefined,
  }
}

/** ******************* Delete robot *********************/

export const DELETE_ROBOT = 'cellDef/DELETE_ROBOT'

interface DeleteRobot extends Action<typeof DELETE_ROBOT> {
  payload: {
    uuid: string,
  }
}

export const deleteRobot = (uuid: string): DeleteRobot => {
  return {
    type: DELETE_ROBOT,
    payload: {
      uuid,
    },
  }
}

/** ******************* Set robot info *********************/

export const SET_ROBOT_INFO = 'cellDef/SET_ROBOT_INFO'

interface SetRobotInfo extends Action<typeof SET_ROBOT_INFO> {
  payload: {
    robotInfo: RobotInfo,
  }
}

export const setRobotInfo = (robotInfo: RobotInfo): SetRobotInfo => {
  return {
    type: SET_ROBOT_INFO,
    payload: {
      robotInfo,
    },
  }
}

/** ******************* Add activity before *********************/

export const ADD_ACTIVITY_ON_INDEX = 'cellDef/ADD_ACTIVITY_ON_INDEX'

interface AddActivityOnIndex extends Action<typeof ADD_ACTIVITY_ON_INDEX> {
  payload: {
    robotUuid: string,
    activity: WorkActivity | MovementActivity,
    idle: IdleActivity,
    index: number,
  }
}

export const addActivityOnIndex = (
  robotUuid: string,
  activity: WorkActivity | MovementActivity,
  idle: IdleActivity,
  index: number,
): AddActivityOnIndex => {
  return {
    type: ADD_ACTIVITY_ON_INDEX,
    payload: {
      robotUuid,
      activity,
      idle,
      index,
    },
  }
}

/** ******************* Delete activity *********************/

export const DELETE_ACTIVITY = 'cellDef/DELETE_ACTIVITY'

interface DeleteActivity extends Action<typeof DELETE_ACTIVITY> {
  payload: {
    robotUuid: string,
    activityUuid: string,
  }
}

export const deleteActivity = (robotUuid: string, activityUuid: string): DeleteActivity => {
  return {
    type: DELETE_ACTIVITY,
    payload: {
      robotUuid,
      activityUuid,
    },
  }
}

/** ******************* Set activity info *********************/

export const SET_ACTIVITY_INFO = 'cellDef/SET_ACTIVITY_INFO'

interface SetActivityInfo extends Action<typeof SET_ACTIVITY_INFO> {
  payload: {
    robotUuid: string,
    activity: Activity,
  }
}

export const setActivityInfo = (robotUuid: string, activity: Activity): SetActivityInfo => {
  return {
    type: SET_ACTIVITY_INFO,
    payload: {
      robotUuid,
      activity,
    },
  }
}

/** ******************* Add activity *********************/

export const addActivity = (
  robotUuid: string,
  type: 'MOVEMENT' | 'WORK',
  before?: string,
): AppThunkAction => (dispatch, getState) => {
  const activities = getState().cellDef.robots.find((r) => r.uuid === robotUuid)?.activities as Activity[]
  const index = before === undefined ? activities.length : activities.findIndex((a) => a.uuid === before)
  const prev = activities[index - 1]
  const activity = (type === 'MOVEMENT') ? newMovementActivity() : newWorkActivity()
  const idle = newIdleActivity()

  try {
    dispatch(addActivityOnIndex(robotUuid, activity, idle, index))
    dispatch(setActivityInfo(robotUuid, prev))
    dispatch(setActivityInfo(robotUuid, idle))
  } catch (e) {
    console.error(e)
  }
}

/** ******************* Check robots *********************/

export const CHECK_ROBOTS = 'cellDef/CHECK_ROBOTS'

interface CheckRobots extends Action<typeof CHECK_ROBOTS> {
  payload: undefined
}

export const checkRobots = (): CheckRobots => {
  return {
    type: CHECK_ROBOTS,
    payload: undefined,
  }
}

/** ******************* Add time offset *********************/

export const ADD_TIME_OFFSET = 'cellDef/ADD_TIME_OFFSET'

interface AddTimeOffset extends Action<typeof ADD_TIME_OFFSET> {
  payload: undefined
}

export const addTimeOffset = (): AddTimeOffset => {
  return {
    type: ADD_TIME_OFFSET,
    payload: undefined,
  }
}

/** ******************* Delete time offset *********************/

export const DELETE_TIME_OFFSET = 'cellDef/DELETE_TIME_OFFSET'

interface DeleteTimeOffset extends Action<typeof DELETE_TIME_OFFSET> {
  payload: {
    timeOffsetUuid: string,
  }
}

export const deleteTimeOffset = (timeOffsetUuid: string): DeleteTimeOffset => {
  return {
    type: DELETE_TIME_OFFSET,
    payload: {
      timeOffsetUuid,
    },
  }
}

/** ******************* Set time offset *********************/

export const SET_TIME_OFFSET_INFO = 'cellDef/SET_TIME_OFFSET_INFO'

interface SetTimeOffsetInfo extends Action<typeof SET_TIME_OFFSET_INFO> {
  payload: {
    timeOffset: TimeOffset,
  }
}

export const setTimeOffsetInfo = (timeOffset: TimeOffset): SetTimeOffsetInfo => {
  return {
    type: SET_TIME_OFFSET_INFO,
    payload: {
      timeOffset,
    },
  }
}

/** ******************* Check time offsets *********************/

export const CHECK_TIME_OFFSETS = 'cellDef/CHECK_TIME_OFFSETS'

interface CheckTimeOffsets extends Action<typeof CHECK_TIME_OFFSETS> {
  payload: undefined
}

export const checkTimeOffsets = (): CheckTimeOffsets => {
  return {
    type: CHECK_TIME_OFFSETS,
    payload: undefined,
  }
}

/** ******************* Add collision *********************/

export const ADD_COLLISION = 'cellDef/ADD_COLLISION'

interface AddCollision extends Action<typeof ADD_COLLISION> {
  payload: undefined
}

export const addCollision = (): AddCollision => {
  return {
    type: ADD_COLLISION,
    payload: undefined,
  }
}

/** ******************* Delete collision *********************/

export const DELETE_COLLISION = 'cellDef/DELETE_COLLISION'

interface DeleteCollision extends Action<typeof DELETE_COLLISION> {
  payload: {
    collisionUuid: string,
  }
}

export const deleteCollision = (collisionUuid: string): DeleteCollision => {
  return {
    type: DELETE_COLLISION,
    payload: {
      collisionUuid,
    },
  }
}

/** ******************* Set collision *********************/

export const SET_COLLISION_INFO = 'cellDef/SET_COLLISION_INFO'

interface SetCollisionInfo extends Action<typeof SET_COLLISION_INFO> {
  payload: {
    collision: Collision,
  }
}

export const setCollisionInfo = (collision: Collision): SetCollisionInfo => {
  return {
    type: SET_COLLISION_INFO,
    payload: {
      collision,
    },
  }
}

/** ******************* Check collisions *********************/

export const CHECK_COLLISIONS = 'cellDef/CHECK_COLLISIONS'

interface CheckCollisions extends Action<typeof CHECK_COLLISIONS> {
  payload: undefined
}

export const checkCollisions = (): CheckCollisions => {
  return {
    type: CHECK_COLLISIONS,
    payload: undefined,
  }
}

/** ******************* Check extra *********************/

export const CHECK_EXTRA = 'cellDef/CHECK_EXTRA'

interface CheckExtra extends Action<typeof CHECK_EXTRA> {
  payload: undefined
}

export const checkExtra = (): CheckExtra => {
  return {
    type: CHECK_EXTRA,
    payload: undefined,
  }
}

/** ******************* Check all *********************/

export const checkAll = (): AppThunkAction => (dispatch) => {
  try {
    dispatch(checkRobots())
    dispatch(checkTimeOffsets())
    dispatch(checkCollisions())
    dispatch(checkExtra())
  } catch (e) {
    console.error(e)
  }
}

/** ******************* Set cell def *********************/

export const SET_CELL_DEF = 'cellDef/SET_CELL_DEF'

interface SetCellDef extends Action<typeof SET_CELL_DEF> {
  payload: {
    cellDef: CellDefJSON,
  }
}

export const setCellDef = (cellDef: CellDefJSON): SetCellDef => {
  return {
    type: SET_CELL_DEF,
    payload: {
      cellDef,
    },
  }
}

/** ******************* Load from JSON *********************/

export const loadFromJSON = (cellDefStr: string): AppThunkAction => (dispatch) => {
  try {
    dispatch(setCellDef(JSON.parse(cellDefStr)))
    dispatch(checkRobots())
    dispatch(checkTimeOffsets())
    dispatch(checkCollisions())
    dispatch(checkExtra())
  } catch (e) {
    console.error(e)
  }
}
