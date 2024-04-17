import { v4 as uuidV4 } from 'uuid'

import { Position } from './position'
import { CellInfo } from './cellInfo'
import { Robot } from './robot'
import { Collision } from './collision'
import { TimeOffset } from './timeOffset'
import { Activity, IdleActivity, MovementActivity, WorkActivity } from './activity'


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
    fixed_start_time: a.fixedStartTime ?? null,
    fixed_end_time: a.fixedEndTime ?? null,
    payload_weight: 0,
  }
}

const parseMovementActivityJSON = (a: MovementActivityJSON): MovementActivity => {
  return {
    uuid: uuidV4(),
    type: 'MOVEMENT',
    id: a.id,
    note: a.note,
    duplicatedId: false,
    minDuration: a.min_duration,
    maxDuration: a.max_duration,
    fixedStartTime: a.fixed_start_time ?? undefined,
    fixedEndTime: a.fixed_end_time ?? undefined,
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
    fixed_start_time: a.fixedStartTime ?? null,
    fixed_end_time: a.fixedStartTime ?? null,
  }
}

const parseWorkActivityJSON = (a: WorkActivityJSON): WorkActivity => {
  return {
    uuid: uuidV4(),
    type: 'WORK',
    id: a.id,
    note: a.note,
    duplicatedId: false,
    duration: a.duration,
    fixedStartTime: a.fixed_start_time ?? undefined,
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

const parseIdleActivityJSON = (a: IdleActivityJSON): IdleActivity => {
  return {
    uuid: uuidV4(),
    type: 'IDLE',
    id: a.id,
    note: a.note,
    duplicatedId: false,
    position: a.position,
    equalStartForMovement: false,
    equalEndForMovement: false,
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

const parseActivityJSON = (a: ActivityJSON): Activity => {
  if (a.type === 'MOVEMENT') {
    return parseMovementActivityJSON(a)
  }
  if (a.type === 'WORK') {
    return parseWorkActivityJSON(a)
  }
  return parseIdleActivityJSON(a)
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

export const parseRobotJSON = (r: RobotJSON): Robot => {
  return {
    uuid: uuidV4(),
    id: r.id,
    note: r.note,
    activities: r.activities.map(parseActivityJSON),
    minActivitiesDuration: r.min_activities_duration,
    duplicatedId: false,
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
    min_offset: timeOffset.minOffset ?? null,
    max_offset: timeOffset.maxOffset ?? null,
  }
}

const findActivitiesDetails = (aId: string, bId: string, robots: Robot[]) => {
  let aUuid = ''
  let aRobotId = ''
  let bUuid = ''
  let bRobotId = ''

  robots.forEach((r) => r.activities.forEach((a) => {
    if (a.id === aId) {
      aUuid = a.uuid
      aRobotId = r.id
    }
    if (a.id === bId) {
      bUuid = a.uuid
      bRobotId = r.id
    }
  }))

  return [aUuid, aRobotId, bUuid, bRobotId]
}

export const parseTimeOffsetJSON = (to: TimeOffsetJSON, robots: Robot[]): TimeOffset => {
  const [aUuid, aRobotId, bUuid, bRobotId] = findActivitiesDetails(to.a_id, to.b_id, robots)

  return {
    uuid: uuidV4(),
    aId: to.a_id,
    aUuid,
    aRobotId,
    aText: `${aRobotId}: ${to.a_id}`,
    bId: to.b_id,
    bUuid,
    bRobotId,
    bText: `${bRobotId}: ${to.b_id}`,
    minOffset: to.min_offset ?? undefined,
    maxOffset: to.max_offset ?? undefined,
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
    b_prev_skip_ratio: collision.bPrevSkipRatio ?? null,
    b_next_skip_ratio: collision.bNextSkipRatio ?? null,
  }
}

export const parseCollisionJSON = (c: CollisionJSON, robots: Robot[]): Collision => {
  const [aUuid, aRobotId, bUuid, bRobotId] = findActivitiesDetails(c.a_id, c.b_id, robots)

  return {
    uuid: uuidV4(),
    aId: c.a_id,
    aUuid,
    aRobotId,
    aText: `${aRobotId}: ${c.a_id}`,
    bId: c.b_id,
    bUuid,
    bRobotId,
    bText: `${bRobotId}: ${c.b_id}`,
    bPrevSkipRatio: c.b_prev_skip_ratio ?? undefined,
    bNextSkipRatio: c.b_next_skip_ratio ?? undefined,
  }
}

export type CellDefJSON = {
  name: string,
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
    name: cellInfo.name,
    cycle_time: cellInfo.cycleTime,
    note: cellInfo.note,
    robots: robots.map(createRobotJSON),
    time_offsets: timeOffsets.map(createTimeOffsetJSON),
    collisions: collisions.map(createCollisionJSON),
  }
}
