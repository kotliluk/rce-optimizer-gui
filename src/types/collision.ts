import { v4 as uuidV4 } from 'uuid'


export type Collision = {
  uuid: string,
  aUuid: string,
  aId: string,
  aRobotId: string,
  aText: string,
  bUuid: string,
  bId: string,
  bRobotId: string,
  bText: string,
  bPrevSkipRatio: number | undefined,
  bNextSkipRatio: number | undefined,
}

export const newCollision = (): Collision => {
  return {
    uuid: uuidV4(),
    aUuid: '-',
    aId: '-',
    aRobotId: '-',
    aText: '-',
    bUuid: '-',
    bId: '-',
    bRobotId: '-',
    bText: '-',
    bPrevSkipRatio: undefined,
    bNextSkipRatio: undefined,
  }
}
