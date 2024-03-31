import { initialState, State } from './state'
import {
  Actions, ADD_ACTIVITY, ADD_ROBOT, DELETE_ACTIVITY, DELETE_ROBOT, SET_ACTIVITY_INFO, SET_CELL_INFO, SET_ROBOT_INFO,
} from './actions'
import { newRobot } from '../../types/robot'
import { newIdleActivity, newMovementActivity, newWorkActivity } from '../../types/activity'


// eslint-disable-next-line @typescript-eslint/default-param-last
export function reducer (state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_CELL_INFO:
      return {
        ...state,
        cellInfo: action.payload.cellInfo,
      }

    case ADD_ROBOT:
      return {
        ...state,
        robots: [...state.robots, newRobot()],
      }

    case DELETE_ROBOT: {
      const uuid = action.payload.uuid
      const robots = state.robots.filter((r) => r.uuid !== uuid)
      const prevDuplicatedId = state.robots.find((r) => r.uuid === uuid)?.duplicatedId
      // if the previous ID was duplicated, checks if it is still duplicate in other robots
      const uuidsOfPrevDuplicatedIds = (prevDuplicatedId === '')
        ? []
        : robots.filter((r) => r.id === prevDuplicatedId).map((r) => r.uuid)

      return {
        ...state,
        robots: robots.length === 0
          ? [newRobot()]
          : robots.map((robot) => {
            // if there is only one other robot with the previous duplicated ID, it is not duplicated anymore
            if (uuidsOfPrevDuplicatedIds.length === 1 && uuidsOfPrevDuplicatedIds.includes(robot.uuid)) {
              return { ...robot, duplicatedId: '' }
            }
            return robot
          }),
      }
    }

    case SET_ROBOT_INFO: {
      const robotInfo = action.payload.robotInfo
      const uuid = robotInfo.uuid
      const id = robotInfo.id
      const prevDuplicatedId = state.robots.find((r) => r.uuid === uuid)?.duplicatedId
      // if the ID has changed and is not empty, find other robots with the same ID
      const uuidsOfDuplicatedIds = (id === prevDuplicatedId || id === '')
        ? []
        : state.robots.filter((r) => r.uuid !== uuid && r.id === id).map((r) => r.uuid)
      // if there is another robot with the same ID, save this value as duplicated
      const duplicatedId = (uuidsOfDuplicatedIds.length > 0) ? id : ''
      // if the ID has changed and the previous value was duplicated, checks if it is still duplicate in other robots
      const uuidsOfPrevDuplicatedIds = (id === prevDuplicatedId || prevDuplicatedId === '')
        ? []
        : state.robots.filter((r) => r.uuid !== uuid && r.id === prevDuplicatedId).map((r) => r.uuid)

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid === uuid) {
            return { ...robot, ...robotInfo, duplicatedId }
          }
          if (uuidsOfDuplicatedIds.includes(robot.uuid)) {
            return { ...robot, duplicatedId }
          }
          // if there is only one other robot with the previous duplicated ID, it is not duplicated anymore
          if (uuidsOfPrevDuplicatedIds.length === 1 && uuidsOfPrevDuplicatedIds.includes(robot.uuid)) {
            return { ...robot, duplicatedId: '' }
          }
          return robot
        }),
      }
    }

    case ADD_ACTIVITY: {
      const robotUuid = action.payload.robotUuid
      const activity = (action.payload.type === 'MOVEMENT') ? newMovementActivity() : newWorkActivity()
      const position = newIdleActivity()

      return {
        ...state,
        robots: state.robots.map((r) => r.uuid === robotUuid
          ? { ...r, activities: [...r.activities, activity, position] }
          : r
        ),
      }
    }

    case DELETE_ACTIVITY: {
      const { activityUuid, robotUuid } = action.payload

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid !== robotUuid) {
            return robot
          }

          const activityIndex = robot.activities.findIndex((a) => a.uuid === activityUuid)
          const positionAfterUuid = robot.activities[activityIndex + 1].uuid

          return {
            ...robot,
            activities: robot.activities.filter((a) => a.uuid !== activityUuid && a.uuid !== positionAfterUuid),
          }
        }),
      }
    }

    case SET_ACTIVITY_INFO: {
      const { activity, robotUuid } = action.payload

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid !== robotUuid) {
            return robot
          }

          return {
            ...robot,
            activities: robot.activities.map((a) => a.uuid === activity.uuid ? activity : a),
          }
        }),
      }
    }

    default:
      return state
  }
}
