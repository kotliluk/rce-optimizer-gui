import { useEffect, useState, Dispatch, SetStateAction } from 'react'

import { isDefNaN } from '../../../utils/number'


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
