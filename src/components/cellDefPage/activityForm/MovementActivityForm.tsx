// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Activity, MovementActivity, newWorkActivity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { useMinMaxDurationValidator } from '../hooks/useMinMaxDurationValidator'
import { OptionalInput } from '../../atoms/input/OptionalInput'
import { useNegativeDefNaNValidator } from '../hooks/useNegativeDefNaNValidator'


interface ActivityFormProps {
  activity: MovementActivity
  onChange: (activity: Activity) => void
  onDelete: (activityUuid: string) => void
  idError: string | undefined
}

export const MovementActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { common: ct, cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, onDelete, idError } = props
  const [opened, setOpened] = useState(true)
  const [durationError, minDurationError, maxDurationError] = useMinMaxDurationValidator(activity, ct, t)
  const [fixedStartError] = useNegativeDefNaNValidator(
    activity.fixedStartTime, ct.errorRequired, t.errorNegativeDuration,
  )
  const [fixedEndError] = useNegativeDefNaNValidator(
    activity.fixedEndTime, ct.errorRequired, t.errorNegativeDuration,
  )

  const handleChange = useCallback((value: Partial<MovementActivity>) => {
    onChange({
      ...activity,
      ...value,
    })
  }, [activity])

  const { id, uuid, minDuration, maxDuration, fixedStartTime, fixedEndTime, note } = activity

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'} movement`}>
      <ActivityHeader
        bodyOpened={opened}
        openedTitle={`${t.movementActivityLabel} ${id}`}
        closedTitle={`${t.movementActivityLabel} ${id} (${minDuration}-${maxDuration} s)`}
        changeBtnLabel={t.changeToWorkActivity}
        onChange={() => onChange(newWorkActivity(uuid))}
        onDelete={() => onDelete(uuid)}
        setBodyOpened={setOpened}
      />

      <div className='activity-form-body'>
        <div className='form-row'>
          <Input
            className='id-input'
            label={`${t.id}: `}
            type='text'
            value={id}
            onChange={id => handleChange({ id })}
            invalid={idError !== undefined}
            errorMessage={idError}
          />

          <Input
            className='duration-input'
            label={`${t.minDuration}: `}
            type='number'
            min={0}
            value={minDuration}
            onChange={minDuration => handleChange({ minDuration: parseFloat(minDuration) })}
            invalid={durationError !== undefined || minDurationError !== undefined}
            errorMessage={durationError ?? minDurationError}
          />

          <Input
            className='duration-input'
            label={`${t.maxDuration}: `}
            type='number'
            min={0}
            value={maxDuration}
            onChange={maxDuration => handleChange({ maxDuration: parseFloat(maxDuration) })}
            invalid={durationError !== undefined || maxDurationError !== undefined}
            errorMessage={durationError ?? maxDurationError}
          />
        </div>

        <div className='form-row'>
          <OptionalInput
            className='fixed-time-input'
            type='number'
            label={`${t.fixedStartTime}:`}
            min={0}
            value={fixedStartTime}
            onChange={(value) => handleChange(value === undefined
              ? { fixedStartTime: undefined }
              : { fixedStartTime: parseFloat(value), fixedEndTime: undefined }
            )}
            defaultDefinedValue={'0'}
            invalid={fixedStartError !== undefined}
            errorMessage={fixedStartError}
          />

          <OptionalInput
            className='fixed-time-input'
            type='number'
            label={`${t.fixedEndTime}:`}
            min={0}
            value={fixedEndTime}
            onChange={(value) => handleChange(value === undefined
              ? { fixedEndTime: undefined }
              : { fixedEndTime: parseFloat(value), fixedStartTime: undefined }
            )}
            defaultDefinedValue={'0'}
            invalid={fixedEndError !== undefined}
            errorMessage={fixedEndError}
          />
        </div>

        <div className='form-row'>
          <Input
            label={`${t.note}: `}
            type='text'
            className='note-input'
            value={note}
            onChange={note => handleChange({ note })}
          />
        </div>
      </div>
    </div>
  )
}
