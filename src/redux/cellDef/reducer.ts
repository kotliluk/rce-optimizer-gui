import { initialState, State } from './state'
import {
  Actions,
  ADD_ACTIVITY,
  ADD_COLLISION,
  ADD_ROBOT,
  ADD_TIME_OFFSET,
  CHECK_COLLISIONS,
  CHECK_EXTRA,
  CHECK_ROBOTS,
  CHECK_TIME_OFFSETS,
  DELETE_ACTIVITY,
  DELETE_COLLISION,
  DELETE_ROBOT,
  DELETE_TIME_OFFSET,
  SET_ACTIVITY_INFO,
  SET_CELL_DEF,
  SET_CELL_INFO,
  SET_COLLISION_INFO,
  SET_ROBOT_INFO,
  SET_TIME_OFFSET_INFO,
} from './actions'
import { hasActivityOrderError, newRobot } from '../../types/robot'
import {
  Activity,
  ActivityShort,
  getMinDuration,
  IdleActivity,
  newIdleActivity,
  newMovementActivity,
  newWorkActivity,
} from '../../types/activity'
import { getDuplicates } from '../../utils/array'
import { newTimeOffset } from '../../types/timeOffset'
import { newCollision } from '../../types/collision'
import { isCollisionInvalid, isTimeOffsetInvalid, resetDetail, updateDetail } from './utils'
import { equalPos } from '../../types/position'
import { isDefNaN, isDefNaNOrNeg } from '../../utils/number'
import { parseCollisionJSON, parseRobotJSON, parseTimeOffsetJSON } from '../../types/cellDefJson'


// eslint-disable-next-line @typescript-eslint/default-param-last
export function reducer (state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_CELL_INFO:
      return {
        ...state,
        cellInfo: action.payload.cellInfo,
        robotsChecked: 'NO',
        allChecked: 'NO',
      }

    case ADD_ROBOT:
      return {
        ...state,
        robots: [...state.robots, newRobot()],
        robotsChecked: 'NO',
        allChecked: 'NO',
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
        allChecked: 'NO',
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
        allChecked: 'NO',
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
        allChecked: 'NO',
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
        allChecked: 'NO',
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

          const isIdle = activity.type === 'IDLE'
          const activities = robot.activities.map((a) => (a.uuid === activity.uuid) ? activity : a)
          const aI = robot.activities.findIndex((a) => a.uuid === activity.uuid)
          const count = activities.length
          let equalPrev = false
          let equalNext = false

          if (isIdle) {
            if (aI >= 2 && activities[aI - 1].type === 'MOVEMENT' && activities[aI - 2].type === 'IDLE') {
              equalPrev = equalPos(
                (activities[aI - 2] as IdleActivity).position,
                (activities[aI] as IdleActivity).position,
              )
            }
            if (aI < count - 2 && activities[aI + 1].type === 'MOVEMENT' && activities[aI + 2].type === 'IDLE') {
              equalNext = equalPos(
                (activities[aI + 2] as IdleActivity).position,
                (activities[aI] as IdleActivity).position,
              )
            }
          }

          return {
            ...robot,
            activities: robot.activities.map((a, i) => {
              const extra: Partial<IdleActivity> = {}
              if (isIdle && i === aI - 2) {
                extra.equalEndForMovement = equalPrev
              }
              if (isIdle && i === aI) {
                extra.equalStartForMovement = equalPrev
                extra.equalEndForMovement = equalNext
              }
              if (isIdle && i === aI + 2) {
                extra.equalStartForMovement = equalNext
              }
              return ((a.uuid === activity.uuid)
                ? { ...activity, ...extra, duplicatedId: false }
                : { ...a, ...extra }
              ) as Activity
            }),
          }
        }),
        robotsChecked: 'NO',
        timeOffsets: state.timeOffsets.map((to) => updateDetail(to, activity)),
        timeOffsetsChecked: 'NO',
        collisions: state.collisions.map((c) => updateDetail(c, activity)),
        collisionsChecked: 'NO',
        allChecked: 'NO',
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
      let zeroDistMovement = false
      let numberError = false
      const robots = state.robots.map((robot) => {
        const duplicatedRobotId = duplicatedRobots.includes(robot.uuid)
        let minActivitiesDuration = 0
        const activities = robot.activities.map((a) => {
          minActivitiesDuration += getMinDuration(a)
          const duplicatedActivityId = duplicatedActivities.includes(a.uuid)
          if (a.type === 'IDLE' && (a.equalStartForMovement || a.equalEndForMovement)) {
            zeroDistMovement = true
          }
          if (a.type === 'IDLE' && (isDefNaN(a.position.x) || isDefNaN(a.position.y) || isDefNaN(a.position.z))) {
            numberError = true
          }
          if (a.type === 'MOVEMENT'
            && (isDefNaNOrNeg(a.minDuration) || isDefNaNOrNeg(a.maxDuration)
              || isDefNaNOrNeg(a.fixedStartTime) || isDefNaNOrNeg(a.fixedEndTime)
            )
          ) {
            numberError = true
          }
          if (a.type === 'WORK' && (isDefNaNOrNeg(a.duration) || isDefNaNOrNeg(a.fixedStartTime))) {
            numberError = true
          }
          return {
            ...a,
            duplicatedId: duplicatedActivityId,
          }
        })
        return {
          ...robot,
          duplicatedId: duplicatedRobotId,
          activities,
          minActivitiesDuration,
        }
      })
      const checked = (!emptyRobotId && duplicatedRobots.length === 0 && !emptyActivityId && !numberError
        && duplicatedActivities.length === 0 && !zeroDistMovement)
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
        allChecked: 'NO',
      }

    case DELETE_TIME_OFFSET:
      return {
        ...state,
        timeOffsets: state.timeOffsets.filter((to) => to.uuid !== action.payload.timeOffsetUuid),
        timeOffsetsChecked: 'NO',
        allChecked: 'NO',
      }

    case SET_TIME_OFFSET_INFO: {
      const timeOffset = action.payload.timeOffset

      return {
        ...state,
        timeOffsets: state.timeOffsets.map((to) => to.uuid === timeOffset.uuid ? timeOffset : to),
        timeOffsetsChecked: 'NO',
        allChecked: 'NO',
      }
    }

    case CHECK_TIME_OFFSETS: {
      if (state.robotsChecked !== 'OK') {
        return state
      }

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
        allChecked: 'NO',
      }

    case DELETE_COLLISION:
      return {
        ...state,
        collisions: state.collisions.filter((c) => c.uuid !== action.payload.collisionUuid),
        collisionsChecked: 'NO',
        allChecked: 'NO',
      }

    case SET_COLLISION_INFO: {
      const collision = action.payload.collision

      return {
        ...state,
        collisions: state.collisions.map((c) => c.uuid === collision.uuid ? collision : c),
        collisionsChecked: 'NO',
        allChecked: 'NO',
      }
    }

    case CHECK_COLLISIONS: {
      if (state.robotsChecked !== 'OK') {
        return state
      }

      const error = state.collisions.some(isCollisionInvalid)

      return {
        ...state,
        collisionsChecked: error ? 'ERROR' : 'OK',
      }
    }

    case CHECK_EXTRA: {
      if (state.robotsChecked === 'ERROR') {
        return {
          ...state,
          allChecked: 'errorRobotCheck',
        }
      }

      if (state.timeOffsetsChecked === 'ERROR') {
        return {
          ...state,
          allChecked: 'errorTimeOffsetsCheck',
        }
      }

      if (state.collisionsChecked === 'ERROR') {
        return {
          ...state,
          allChecked: 'errorCollisionsCheck',
        }
      }

      const activityOrderErrors = state.robots.filter(hasActivityOrderError)
      if (activityOrderErrors.length > 0) {
        const allChecked = `errorActivityOrder:${activityOrderErrors.map((r) => r.id).join(', ')}`
        console.error(allChecked)
        return {
          ...state,
          allChecked,
        }
      }

      const minDurationErrors = state.robots.filter((r) => r.minActivitiesDuration > state.cellInfo.cycleTime)
      if (minDurationErrors.length > 0) {
        const info = minDurationErrors.map((r) => `${r.id} (${r.minActivitiesDuration}s)`).join(', ')
        const allChecked = `errorMinDuration:${info}`
        console.error(allChecked)
        return {
          ...state,
          allChecked,
        }
      }

      return {
        ...state,
        allChecked: 'OK',
      }
    }

    case SET_CELL_DEF: {
      const cellDef = action.payload.cellDef
      const robots = cellDef.robots.map(parseRobotJSON)

      return {
        cellInfo: {
          name: cellDef.name,
          note: cellDef.note,
          cycleTime: cellDef.cycle_time,
        },
        robots,
        robotsChecked: 'NO',
        timeOffsets: cellDef.time_offsets.map((to) => parseTimeOffsetJSON(to, robots)),
        timeOffsetsChecked: 'NO',
        collisions: cellDef.collisions.map((c) => parseCollisionJSON(c, robots)),
        collisionsChecked: 'NO',
        activities: [],
        allChecked: 'NO',
      }
    }

    default:
      return state
  }
}
