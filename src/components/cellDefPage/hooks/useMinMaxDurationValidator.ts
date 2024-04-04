import { useEffect, useState } from 'react'

import { IdleActivity, MovementActivity } from '../../../types/activity'
import { Translation } from '../../../logic/translation/translation'


export const useMinMaxDurationValidator = (
  activity: MovementActivity | IdleActivity,
  ct: Translation['common'],
  t: Translation['cellDefPage']['robots']['activities'],
): [string | undefined, string | undefined, string | undefined] => {
  const [durationError, setDurationError] = useState<string | undefined>(undefined)
  const [minDurationError, setMinDurationError] = useState<string | undefined>(undefined)
  const [maxDurationError, setMaxDurationError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (activity.minDuration > activity.maxDuration) {
      setDurationError(t.errorMinMaxDurationOrder)
    } else {
      setDurationError(undefined)
    }

    if (isNaN(activity.minDuration)) {
      setMinDurationError(ct.errorRequired)
    } else {
      setMinDurationError(undefined)
    }

    if (isNaN(activity.maxDuration)) {
      setMaxDurationError(ct.errorRequired)
    } else {
      setMaxDurationError(undefined)
    }
  }, [activity.minDuration, activity.maxDuration, t, setDurationError, setMinDurationError, setMaxDurationError])

  return [durationError, minDurationError, maxDurationError]
}
