import { useEffect, useState, Dispatch, SetStateAction } from 'react'

import { isDefNaN } from '../../../utils/number'


/**
 * Creates a hook which validates the given value.
 * It validates that the value is not NaN and is non-negative. Undefined value is valid.
 * The hook returns string or undefined error and its setter.
 */
export const useNegativeDefNaNValidator = (
  value: number | undefined,
  errorRequired: string,
  errorNegative: string,
): [string | undefined, Dispatch<SetStateAction<string | undefined>>] => {
  const [error, setError] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (isDefNaN(value)) {
      setError(errorRequired)
    } else if (value !== undefined && value < 0) {
      setError(errorNegative)
    } else {
      setError(undefined)
    }
  }, [value, errorRequired, errorNegative])

  return [error, setError]
}
