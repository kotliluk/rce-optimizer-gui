// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch } from '../../../redux/useDispatch'
import { deleteTimeOffset, setTimeOffsetInfo } from '../../../redux/cellDef/actions'
import { TimeOffset } from '../../../types/timeOffset'
import { Button } from '../../atoms/button/Button'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { Cross } from '../../icons/Cross'
import { DownArrow } from '../../icons/DownArrow'
import { selectActivities } from '../../../redux/cellDef/selector'
import { Select, SelectValue } from '../../atoms/select/Select'
import { OptionalInput } from '../../atoms/input/OptionalInput'
import { useMinMaxOffsetValidator } from '../hooks/useMinMaxOffsetValidator'


interface TimeOffsetFormProps {
  timeOffset: TimeOffset
}

export const TimeOffsetForm = (props: TimeOffsetFormProps): JSX.Element => {
  const { timeOffset } = props
  const { common: ct, cellDefPage: { timeOffsets: t } } = useSelector(selectTranslation)
  const allActivities = useSelector(selectActivities)
  const [activities, setActivities] = useState<SelectValue[]>([])
  const [opened, setOpened] = useState(true)
  const [aIdError, setAIdError] = useState<string | undefined>(undefined)
  const [bIdError, setBIdError] = useState<string | undefined>(undefined)
  const [offsetError, minOffsetError, maxOffsetError] = useMinMaxOffsetValidator(timeOffset, ct, t)
  const dispatch = useDispatch()

  const handleDelete = useCallback(() => {
    dispatch(deleteTimeOffset(timeOffset.uuid))
  }, [timeOffset.uuid])

  const handleAIdChange = useCallback((aUuid: string) => {
    const activity = allActivities.find((a) => a.uuid === aUuid) ?? { id: '-', robotId: '-', text: '-' }

    dispatch(setTimeOffsetInfo({
      ...timeOffset,
      aUuid,
      aId: activity.id,
      aRobotId: activity.robotId,
      aText: activity.text,
    }))
  }, [timeOffset, allActivities])

  const handleBIdChange = useCallback((bUuid: string) => {
    const activity = allActivities.find((a) => a.uuid === bUuid) ?? { id: '-', robotId: '-', text: '-' }

    dispatch(setTimeOffsetInfo({
      ...timeOffset,
      bUuid,
      bId: activity.id,
      bRobotId: activity.robotId,
      bText: activity.text,
    }))
  }, [timeOffset, allActivities])

  const handleChange = useCallback((value: Partial<TimeOffset>) => {
    dispatch(setTimeOffsetInfo({
      ...timeOffset,
      ...value,
    }))
  }, [timeOffset])

  useEffect(() => {
    setActivities([
      { value: '-', text: '-' },
      ...allActivities.map((a) => ({ value: a.uuid, text: a.text })),
    ])
  }, [allActivities, t, setActivities])

  useEffect(() => {
    if (timeOffset.aUuid !== '-' && timeOffset.aUuid === timeOffset.bUuid) {
      setAIdError('Same id')
      setBIdError('Same id')
    } else {
      if (timeOffset.aUuid === '-') {
        setAIdError(ct.errorRequired)
      }
      if (timeOffset.bUuid === '-') {
        setBIdError(ct.errorRequired)
      }
    }
  }, [timeOffset.aId, timeOffset.bId, t, setAIdError, setBIdError])

  return (
    <div className={`time-offset-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='time-offset-form-header'>
        <span className='time-offset-form-title'>
          {t.timeOffsetLabel} ({timeOffset.aText}, {timeOffset.bText})
        </span>
        <Button className='delete-btn' onClick={handleDelete}>
          <Cross />
        </Button>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>
          <DownArrow className={`${opened ? 'up' : 'down'}`} />
        </Button>
      </div>

      <div className='time-offset-form-body'>
        <div className='form-row'>
          <div className='id-wrapper'>
            <span className='id-label'>{t.aId}:</span>
            <Select
              className='id-input'
              selected={timeOffset.aUuid}
              values={activities}
              onChange={aId => handleAIdChange(aId)}
            />
          </div>

          <div className='id-wrapper'>
            <span className='id-label'>{t.bId}:</span>
            <Select
              className='id-input'
              selected={timeOffset.bUuid}
              values={activities}
              onChange={bId => handleBIdChange(bId)}
            />
          </div>
        </div>

        <div className='form-row'>
          <OptionalInput
            className='offset-value-input'
            type='number'
            label={`${t.minOffset}:`}
            value={timeOffset.minOffset}
            onChange={(value) => handleChange({ minOffset: value === undefined ? undefined : parseFloat(value) })}
            defaultDefinedValue={'0'}
            invalid={offsetError !== undefined || minOffsetError !== undefined}
            errorMessage={offsetError ?? minOffsetError}
          />

          <OptionalInput
            className='offset-value-input'
            type='number'
            label={`${t.maxOffset}:`}
            value={timeOffset.maxOffset}
            onChange={(value) => handleChange({ maxOffset: value === undefined ? undefined : parseFloat(value) })}
            defaultDefinedValue={'0'}
            invalid={offsetError !== undefined || maxOffsetError !== undefined}
            errorMessage={offsetError ?? maxOffsetError}
          />
        </div>
      </div>
    </div>
  )
}
