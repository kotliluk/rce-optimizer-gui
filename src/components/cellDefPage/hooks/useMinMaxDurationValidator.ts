import { useEffect } from 'react'

import { MovementActivity } from '../../../types/activity'
import { Translation } from '../../../logic/translation/translation'
import { useMinMaxRangeValidator } from './useMinMaxRangeValidator'


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
