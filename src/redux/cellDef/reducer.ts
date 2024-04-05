import { initialState, State } from './state'
import {
  Actions,
  ADD_ACTIVITY,
  ADD_COLLISION,
  ADD_ROBOT,
  ADD_TIME_OFFSET,
  CHECK_COLLISIONS,
  CHECK_ROBOTS,
  CHECK_TIME_OFFSETS,
  DELETE_ACTIVITY,
  DELETE_COLLISION,
  DELETE_ROBOT,
  DELETE_TIME_OFFSET,
  SET_ACTIVITY_INFO,
  SET_CELL_INFO,
  SET_COLLISION_INFO,
  SET_ROBOT_INFO,
  SET_TIME_OFFSET_INFO,
} from './actions'
import { newRobot } from '../../types/robot'
import { ActivityShort, newIdleActivity, newMovementActivity, newWorkActivity } from '../../types/activity'
import { getDuplicates } from '../../utils/array'
import { newTimeOffset } from '../../types/timeOffset'
import { newCollision } from '../../types/collision'
import { isCollisionInvalid, isTimeOffsetInvalid, resetDetail, updateDetail } from './utils'


// eslint-disable-next-line @typescript-eslint/default-param-last
export function reducer (state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_CELL_INFO:
      return {
        ...state,
        cellInfo: action.payload.cellInfo,
        robotsChecked: 'NO',
      }

    case ADD_ROBOT:
      return {
        ...state,
        robots: [...state.robots, newRobot()],
        robotsChecked: 'NO',
      }

    case DELETE_ROBOT: {
      const uuid = action.payload.uuid
      const robots = state.robots.filter((r) => r.uuid !== uuid)

      return {
        ...state,
        robots: (robots.length === 0) ? [newRobot()] : robots,
        robotsChecked: 'NO',
        timeOffsetsChecked: 'NO',
        collisionsChecked: 'NO',
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
        robotsChecked: 'NO',
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
        robotsChecked: 'NO',
      }
    }

    case DELETE_ACTIVITY: {
      const { activityUuid, robotUuid } = action.payload
      const uuid1 = activityUuid
      let uuid2: string

      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.uuid !== robotUuid) {
            return robot
          }

          const activityIndex = robot.activities.findIndex((a) => a.uuid === uuid1)
          uuid2 = robot.activities[activityIndex + 1].uuid

          return {
            ...robot,
            activities: robot.activities.filter((a) => a.uuid !== uuid1 && a.uuid !== uuid2),
          }
        }),
        robotsChecked: 'NO',
        timeOffsets: state.timeOffsets.map((to) => resetDetail(to, uuid1, uuid2)),
        timeOffsetsChecked: 'NO',
        collisions: state.collisions.map((c) => resetDetail(c, uuid1, uuid2)),
        collisionsChecked: 'NO',
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
        robotsChecked: 'NO',
        timeOffsets: state.timeOffsets.map((to) => updateDetail(to, activity)),
        timeOffsetsChecked: 'NO',
        collisions: state.collisions.map((c) => updateDetail(c, activity)),
        collisionsChecked: 'NO',
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
      const robots = state.robots.map((robot) => {
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
      })
      const checked = (!emptyRobotId && duplicatedRobots.length === 0
          && !emptyActivityId && duplicatedActivities.length === 0)
        ? 'OK'
        : 'ERROR'
      const activities: ActivityShort[] = checked === 'OK'
        ? robots.map((r) => r.activities.map(
          ({ uuid, id }) => ({ uuid, id, robotId: r.id, text: `${r.id}: ${id}` }))
        ).flat()
        : []

      return {
        ...state,
        robots,
        robotsChecked: checked,
        activities,
      }
    }

    case ADD_TIME_OFFSET:
      return {
        ...state,
        timeOffsets: [...state.timeOffsets, newTimeOffset()],
        timeOffsetsChecked: 'NO',
      }

    case DELETE_TIME_OFFSET:
      return {
        ...state,
        timeOffsets: state.timeOffsets.filter((to) => to.uuid !== action.payload.timeOffsetUuid),
        timeOffsetsChecked: 'NO',
      }

    case SET_TIME_OFFSET_INFO: {
      const timeOffset = action.payload.timeOffset

      return {
        ...state,
        timeOffsets: state.timeOffsets.map((to) => to.uuid === timeOffset.uuid ? timeOffset : to),
        timeOffsetsChecked: 'NO',
      }
    }

    case CHECK_TIME_OFFSETS: {
      const error = state.timeOffsets.some(isTimeOffsetInvalid)

      return {
        ...state,
        timeOffsetsChecked: error ? 'ERROR' : 'OK',
      }
    }

    case ADD_COLLISION:
      return {
        ...state,
        collisions: [...state.collisions, newCollision()],
        collisionsChecked: 'NO',
      }

    case DELETE_COLLISION:
      return {
        ...state,
        collisions: state.collisions.filter((c) => c.uuid !== action.payload.collisionUuid),
        collisionsChecked: 'NO',
      }

    case SET_COLLISION_INFO: {
      const collision = action.payload.collision

      return {
        ...state,
        collisions: state.collisions.map((c) => c.uuid === collision.uuid ? collision : c),
        collisionsChecked: 'NO',
      }
    }

    case CHECK_COLLISIONS: {
      const error = state.collisions.some(isCollisionInvalid)

      return {
        ...state,
        collisionsChecked: error ? 'ERROR' : 'OK',
      }
    }

    default:
      return state
  }
}
