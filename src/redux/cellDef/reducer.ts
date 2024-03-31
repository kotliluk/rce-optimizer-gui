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
        robots: [...state.robots, newRobot(`r${String(state.robots.length + 1).padStart(2, '0')}`)],
      }

    case DELETE_ROBOT: {
      const robots = state.robots.filter((r) => r.uuid !== action.payload.uuid)

      return {
        ...state,
        robots: robots.length === 0 ? [newRobot('r01')] : robots,
      }
    }

    case SET_ROBOT_INFO: {
      const robotInfo = action.payload.robotInfo

      return {
        ...state,
        robots: state.robots.map((r) => r.uuid === robotInfo.uuid ? { ...r, ...robotInfo } : r),
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
