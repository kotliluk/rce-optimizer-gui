import { Translation } from '../../../logic/translation/translation'
import { useMinMaxRangeValidator } from './useMinMaxRangeValidator'
import { TimeOffset } from '../../../types/timeOffset'


export const useMinMaxOffsetValidator = (
  offset: TimeOffset,
  ct: Translation['common'],
  t: Translation['cellDefPage']['timeOffsets'],
): [string | undefined, string | undefined, string | undefined] => {
  return useMinMaxRangeValidator(offset.minOffset, offset.maxOffset, t.errorMinMaxOffsetsOrder, ct.errorRequired)
}
