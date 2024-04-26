/**
 * Returns whether the given value is defined (not undefined) and NaN.
 */
export const isDefNaN = (v: number | undefined): boolean => v !== undefined && isNaN(v)

/**
 * Returns whether the given value is defined (not undefined) and NaN or negative.
 */
export const isDefNaNOrNeg = (v: number | undefined): boolean => {
  if (v === undefined) {
    return false
  }
  return isNaN(v) || v < 0
}
