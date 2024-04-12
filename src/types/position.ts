export type Position = {
  x: number,
  y: number,
  z: number,
}

export const formatPosition = (pos: Position): string => {
  return `[${pos.x}; ${pos.y}; ${pos.z}]`
}

export const equalPos = (a: Position, b: Position): boolean => {
  return a.x === b.x && a.y === b.y && a.z === b.z
}
