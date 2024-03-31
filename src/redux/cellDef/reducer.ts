import { initialState, State } from './state'
import {
  Actions,
  ADD_ACTIVITY,
  ADD_ROBOT,
  CHECK_ROBOTS,
  DELETE_ACTIVITY,
  DELETE_ROBOT,
  SET_ACTIVITY_INFO,
  SET_CELL_INFO,
  SET_ROBOT_INFO,
} from './actions'
import { newRobot } from '../../types/robot'
import { newIdleActivity, newMovementActivity, newWorkActivity } from '../../types/activity'
import { getDuplicates } from '../../utils/array'


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

      return {
        ...state,
        robots: (robots.length === 0) ? [newRobot()] : robots,
      }
    }

    case SET_ROBOT_INFO: {
      const robotInfo = action.payload.robotInfo

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid === robotInfo.uuid) {
            return { ...robot, ...robotInfo, duplicatedId: false }
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
        robots: state.robots.map((r) => (r.uuid === robotUuid)
          ? { ...r, activities: [...r.activities, activity, position] }
          : r
        ),
      }
    }

    case DELETE_ACTIVITY: {
      const { activityUuid, robotUuid } = action.payload
      const uuid1 = activityUuid

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid !== robotUuid) {
            return robot
          }

          const activityIndex = robot.activities.findIndex((a) => a.uuid === uuid1)
          const uuid2 = robot.activities[activityIndex + 1].uuid

          return {
            ...robot,
            activities: robot.activities.filter((a) => a.uuid !== uuid1 && a.uuid !== uuid2),
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
            activities: robot.activities
              .map((a) => a.uuid === activity.uuid ? { ...activity, duplicatedId: false } : a),
          }
        }),
      }
    }

    case CHECK_ROBOTS: {
      const emptyRobotId = state.robots.find((r) => r.id === '')
      const duplicatedRobots = getDuplicates(state.robots, (a, b) => a.id !== '' && a.id === b.id)
        .map((r) => r.uuid)
      const allActivities = state.robots.map((r) => r.activities).flat()
      const emptyActivityId = allActivities.find((a) => a.id === '')
      const duplicatedActivities = getDuplicates(allActivities, (a, b) => a.id !== '' && a.id === b.id)
        .map((a) => a.uuid)
      const checked = (!emptyRobotId && duplicatedRobots.length === 0
          && !emptyActivityId && duplicatedActivities.length === 0)
        ? 'OK'
        : 'ERROR'

      console.log(`Check robots: ${checked}`)

      return {
        ...state,
        robots: state.robots.map((robot) => {
          const duplicatedRobotId = duplicatedRobots.includes(robot.uuid)
          return {
            ...robot,
            duplicatedId: duplicatedRobotId,
            activities: robot.activities.map((a) => {
              const duplicatedActivityId = duplicatedActivities.includes(a.uuid)
              return {
                ...a,
                duplicatedId: duplicatedActivityId,
              }
            }),
          }
        }),
        checked,
      }
    }

    default:
      return state
  }
}
