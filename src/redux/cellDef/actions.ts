import { Action } from 'redux'

import { CellInfo } from '../../types/cellInfo'
import { RobotInfo } from '../../types/robot'
import { Activity } from '../../types/activity'


export type Actions = SetCellInfo | AddRobot | DeleteRobot | SetRobotInfo
| AddActivity | DeleteActivity | SetActivityInfo


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

/** ******************* Add activity *********************/

export const ADD_ACTIVITY = 'cellDef/ADD_ACTIVITY'

interface AddActivity extends Action<typeof ADD_ACTIVITY> {
  payload: {
    robotUuid: string,
    type: 'MOVEMENT' | 'WORK',
  }
}

export const addActivity = (robotUuid: string, type: 'MOVEMENT' | 'WORK'): AddActivity => {
  return {
    type: ADD_ACTIVITY,
    payload: {
      robotUuid,
      type,
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

