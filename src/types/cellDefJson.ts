import { Position } from './position'
import { CellInfo } from './cellInfo'
import { Robot } from './robot'
import { Collision } from './collision'
import { TimeOffset } from './timeOffset'
import { undefToNull } from '../utils/undefined'
import { Activity } from './activity'


export type MovementActivityJSON = {
  type: 'MOVEMENT',
  id: string,
  note: string,
  min_duration: number,
  max_duration: number,
  start: Position,
  end: Position,
  fixed_start_time: number | null,
  fixed_end_time: number | null,
  payload_weight: number,
}

const createMovementActivityJSON = (a: Activity, s: Activity, e: Activity): MovementActivityJSON => {
  if (a.type !== 'MOVEMENT' || s.type !== 'IDLE' || e.type !== 'IDLE') {
    throw Error(`Unexpected activities: ${s.type}, ${a.type} (${a.id}), ${e.type}. Expected: IDLE, MOVEMENT, IDLE`)
  }
  return {
    type: 'MOVEMENT',
    id: a.id,
    note: a.note,
    min_duration: a.minDuration,
    max_duration: a.maxDuration,
    start: s.position,
    end: e.position,
    fixed_start_time: undefToNull(a.fixedStartTime),
    fixed_end_time: undefToNull(a.fixedEndTime),
    payload_weight: 0,
  }
}

export type WorkActivityJSON = {
  type: 'WORK',
  id: string,
  note: string,
  duration: number,
  start: Position,
  end: Position,
  fixed_start_time: number | null,
  fixed_end_time: number | null,
}

const createWorkActivityJSON = (a: Activity, s: Activity, e: Activity): WorkActivityJSON => {
  if (a.type !== 'WORK' || s.type !== 'IDLE' || e.type !== 'IDLE') {
    throw Error(`Unexpected activities: ${s.type}, ${a.type} (${a.id}), ${e.type}. Expected: IDLE, WORK, IDLE`)
  }
  return {
    type: 'WORK',
    id: a.id,
    note: a.note,
    duration: a.duration,
    start: s.position,
    end: e.position,
    fixed_start_time: undefToNull(a.fixedStartTime),
    fixed_end_time: undefToNull(a.fixedStartTime),
  }
}

export type IdleActivityJSON = {
  type: 'IDLE',
  id: string,
  note: string,
  position: Position,
  payload_weight: number,
}

const createIdleActivityJSON = (a: Activity): IdleActivityJSON => {
  if (a.type !== 'IDLE') {
    throw Error(`Unexpected activity: ${a.type} (${a.id}). Expected: IDLE`)
  }
  return {
    type: 'IDLE',
    id: a.id,
    note: a.note,
    position: a.position,
    payload_weight: 0,
  }
}

export type ActivityJSON = MovementActivityJSON | WorkActivityJSON | IdleActivityJSON

const createActivityJSON = (prev: Activity, a: Activity, next: Activity): ActivityJSON => {
  if (a.type === 'IDLE') {
    return createIdleActivityJSON(a)
  }
  if (a.type === 'MOVEMENT' && prev.type === 'IDLE' && next.type === 'IDLE') {
    return createMovementActivityJSON(a, prev, next)
  }
  if (a.type === 'WORK' && prev.type === 'IDLE' && next.type === 'IDLE') {
    return createWorkActivityJSON(a, prev, next)
  }
  throw Error(`Unsupported order of Activities: ${prev.type}, ${a.type}, ${next.type}`)
}

export type RobotJSON = {
  id: string,
  note: string,
  position: Position,
  weight: number,
  maximum_reach: number,
  min_activities_duration: number,
  activities: ActivityJSON[],
}

const createRobotJSON = (robot: Robot): RobotJSON => {
  const activities: ActivityJSON[] = []

  activities.push(createIdleActivityJSON(robot.activities[0]))
  for (let i = 1; i < robot.activities.length - 1; ++i) {
    activities.push(createActivityJSON(robot.activities[i - 1], robot.activities[i], robot.activities[i + 1]))
  }
  activities.push(createIdleActivityJSON(robot.activities[robot.activities.length - 1]))

  return {
    id: robot.id,
    note: robot.note,
    position: { x: 0, y: 0, z: 0 },
    weight: 0,
    maximum_reach: 0,
    min_activities_duration: robot.minActivitiesDuration,
    activities,
  }
}

export type TimeOffsetJSON = {
  a_id: string,
  b_id: string,
  min_offset: number | null,
  max_offset: number | null,
}

const createTimeOffsetJSON = (timeOffset: TimeOffset): TimeOffsetJSON => {
  return {
    a_id: timeOffset.aId,
    b_id: timeOffset.bId,
    min_offset: undefToNull(timeOffset.minOffset),
    max_offset: undefToNull(timeOffset.maxOffset),
  }
}

export type CollisionJSON = {
  a_id: string,
  b_id: string,
  b_prev_skip_ratio: number | null,
  b_next_skip_ratio: number | null,
}

const createCollisionJSON = (collision: Collision): CollisionJSON => {
  return {
    a_id: collision.aId,
    b_id: collision.bId,
    b_prev_skip_ratio: undefToNull(collision.bPrevSkipRatio),
    b_next_skip_ratio: undefToNull(collision.bNextSkipRatio),
  }
}

export type CellDefJSON = {
  cycle_time: number,
  note: string,
  robots: RobotJSON[],
  time_offsets: TimeOffsetJSON[],
  collisions: CollisionJSON[],
}

export const createCellDefJSON = (
  cellInfo: CellInfo,
  robots: Robot[],
  timeOffsets: TimeOffset[],
  collisions: Collision[],
): CellDefJSON => {
  return {
    cycle_time: cellInfo.cycleTime,
    note: cellInfo.note,
    robots: robots.map(createRobotJSON),
    time_offsets: timeOffsets.map(createTimeOffsetJSON),
    collisions: collisions.map(createCollisionJSON),
  }
}
