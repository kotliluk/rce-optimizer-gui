import { useEffect } from 'react'

import { Translation } from '../../../logic/translation/translation'
import { useMinMaxRangeValidator } from './useMinMaxRangeValidator'
import { TimeOffset } from '../../../types/timeOffset'


export const useMinMaxOffsetValidator = (
  offset: TimeOffset,
  ct: Translation['common'],
  t: Translation['cellDefPage']['timeOffsets'],
): [string | undefined, string | undefined, string | undefined] => {
  const [minMaxError, minError, maxError, setMinMaxError] = useMinMaxRangeValidator(
    offset.minOffset, offset.maxOffset, t.errorMinMaxOffsetsOrder, ct.errorRequired,
  )

  useEffect(() => {
    if (offset.minOffset === undefined && offset.maxOffset === undefined) {
      setMinMaxError(t.errorMinMaxOffsetUndef)
    }
  }, [offset, setMinMaxError, t])

  return [minMaxError, minError, maxError]
}
