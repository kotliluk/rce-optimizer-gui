export const parseIntOrDefault = (str: string | null, defaultInt: number): number => {
  if (str === null) {
    return defaultInt
  }

  const parsed = Number.parseInt(str)
  return isNaN(parsed) ? defaultInt : parsed
}

export const parseFloatOrDefault = (str: string | null, defaultFloat: number): number => {
  if (str === null) {
    return defaultFloat
  }

  const parsed = Number.parseFloat(str.replace(',', '.'))
  return isNaN(parsed) ? defaultFloat : parsed
}

export const intOrDefaultParser = (defInt: number) => (str: string | null): number => parseIntOrDefault(str, defInt)

/**
 * Returns whether the given value is defined (not undefined) and NaN.
 */
export const isDefNaN = (v: number | undefined): boolean => v !== undefined && isNaN(v)
