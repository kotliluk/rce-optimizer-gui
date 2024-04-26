import { useEffect } from 'react'

import { MovementActivity } from '../../../types/activity'
import { Translation } from '../../../logic/translation/translation'
import { useMinMaxRangeValidator } from './useMinMaxRangeValidator'


/**
 * Creates a hook which validates min and max durations of the movement.
 * It validates that the values are not NaN, are non-negative, and that min < max. Undefined values are valid.
 * The hook returns 3 string or undefined values: min-max duration error, min duration error, max duration error.
 */
export const useMinMaxDurationValidator = (
  a: MovementActivity,
  ct: Translation['common'],
  t: Translation['cellDefPage']['robots']['activities'],
): [string | undefined, string | undefined, string | undefined] => {
  const [minMaxError, minError, maxError, _, setMinError, setMaxError] = useMinMaxRangeValidator(
    a.minDuration, a.maxDuration, t.errorMinMaxDurationOrder, ct.errorRequired,
  )

  useEffect(() => {
    if (a.minDuration !== undefined && a.minDuration < 0) {
      setMinError(t.errorNegativeDuration)
    }
    if (a.maxDuration !== undefined && a.maxDuration < 0) {
      setMaxError(t.errorNegativeDuration)
    }
  }, [a.minDuration, a.maxDuration, t])

  return [minMaxError, minError, maxError]
}
