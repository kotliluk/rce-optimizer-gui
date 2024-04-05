import { useEffect, useState } from 'react'

import { isDefNaN } from '../../../utils/number'


export const useMinMaxRangeValidator = (
  min: number | undefined,
  max: number | undefined,
  minMaxErrorMessage: string,
  requiredErrorMessage: string | undefined,
): [string | undefined, string | undefined, string | undefined] => {
  const [minMaxError, setMinMaxError] = useState<string | undefined>(undefined)
  const [minError, setMinError] = useState<string | undefined>(undefined)
  const [maxError, setMaxError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (min !== undefined && max !== undefined && min > max) {
      setMinMaxError(minMaxErrorMessage)
    } else {
      setMinMaxError(undefined)
    }

    if (isDefNaN(min)) {
      setMinError(requiredErrorMessage)
    } else {
      setMinError(undefined)
    }

    if (isDefNaN(max)) {
      setMaxError(requiredErrorMessage)
    } else {
      setMaxError(undefined)
    }
  }, [min, max, minMaxErrorMessage, requiredErrorMessage, setMinMaxError, setMinError, setMaxError])

  return [minMaxError, minError, maxError]
}
