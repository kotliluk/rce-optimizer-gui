import { Activity } from '../../types/activity'
import { TimeOffset } from '../../types/timeOffset'
import { Collision } from '../../types/collision'


type ADetail = { aUuid: string, aId: string, aRobotId: string, aText: string }
type BDetail = { bUuid: string, bId: string, bRobotId: string, bText: string }
type Detail = ADetail & BDetail

const resetADetail = (o: ADetail): void => {
  o.aUuid = '-'
  o.aId = '-'
  o.aRobotId = '-'
  o.aText = '-'
}

const resetBDetail = (o: BDetail): void => {
  o.bUuid = '-'
  o.bId = '-'
  o.bRobotId = '-'
  o.bText = '-'
}

export const resetDetail = <T extends Detail> (d: T, uuid1: string, uuid2: string): T => {
  if (d.aUuid === uuid1 || d.aUuid === uuid2 || d.bUuid === uuid1 || d.bUuid === uuid2) {
    const newTo = { ...d }
    if (d.aUuid === uuid1 || d.aUuid === uuid2) {
      resetADetail(newTo)
    }
    if (d.bUuid === uuid1 || d.bUuid === uuid2) {
      resetBDetail(newTo)
    }
    return newTo
  }
  return d
}

const updateADetail = (o: ADetail, a: Activity): void => {
  o.aId = a.id
  o.aText = `${o.aRobotId}: ${a.id}`
}

const updateBDetail = (o: BDetail, a: Activity): void => {
  o.bId = a.id
  o.bText = `${o.bRobotId}: ${a.id}`
}

export const updateDetail = <T extends Detail> (d: T, activity: Activity): T => {
  if (d.aUuid === activity.uuid || d.bUuid === activity.uuid) {
    const newD = { ...d }
    if (d.aUuid === activity.uuid) {
      updateADetail(newD, activity)
    }
    if (d.bUuid === activity.uuid) {
      updateBDetail(newD, activity)
    }
    return newD
  }
  return d
}

export const isTimeOffsetInvalid = (to: TimeOffset): boolean => {
  return to.aUuid === '' || to.bUuid === '' || to.aUuid === to.bUuid
    || (to.minOffset !== undefined && (to.minOffset < 0 || to.minOffset > 100))
    || (to.maxOffset !== undefined && (to.maxOffset < 0 || to.maxOffset > 100))
    || (to.minOffset !== undefined && to.maxOffset !== undefined && to.minOffset > to.maxOffset)
    || (to.minOffset === undefined && to.maxOffset === undefined)
}

export const isCollisionInvalid = (c: Collision): boolean => {
  return c.aUuid === '' || c.bUuid === '' || c.aRobotId === c.bRobotId
    || (c.bPrevSkipRatio !== undefined && (c.bPrevSkipRatio < 0 || c.bPrevSkipRatio > 100))
    || (c.bNextSkipRatio !== undefined && (c.bNextSkipRatio < 0 || c.bNextSkipRatio > 100))
}
