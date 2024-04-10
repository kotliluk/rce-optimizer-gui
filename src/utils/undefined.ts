export const undefToNull = <T> (x: T | undefined): T | null => {
  if (x === undefined) {
    return null
  }
  return x
}
