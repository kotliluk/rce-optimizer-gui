import { IdleActivity, MovementActivity } from '../../../types/activity'
import { Translation } from '../../../logic/translation/translation'
import { useMinMaxRangeValidator } from './useMinMaxRangeValidator'


export const useMinMaxDurationValidator = (
  a: MovementActivity | IdleActivity,
  ct: Translation['common'],
  t: Translation['cellDefPage']['robots']['activities'],
): [string | undefined, string | undefined, string | undefined] => {
  return useMinMaxRangeValidator(a.minDuration, a.maxDuration, t.errorMinMaxDurationOrder, ct.errorRequired)
}
