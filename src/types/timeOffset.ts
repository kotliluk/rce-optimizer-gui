import { v4 as uuidV4 } from 'uuid'


export type TimeOffset = {
  uuid: string,
  aUuid: string,
  aId: string,
  aRobotId: string,
  aText: string,
  bUuid: string,
  bId: string,
  bRobotId: string,
  bText: string,
  minOffset: number | undefined,
  maxOffset: number | undefined,
}

export const newTimeOffset = (): TimeOffset => {
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
    minOffset: undefined,
    maxOffset: undefined,
  }
}
