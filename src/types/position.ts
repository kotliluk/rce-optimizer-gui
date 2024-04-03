export type Position = {
  x: number,
  y: number,
  z: number,
}

export const formatPosition = (pos: Position): string => {
  return `[${pos.x}; ${pos.y}; ${pos.z}]`
}
