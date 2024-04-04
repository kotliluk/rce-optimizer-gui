// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Activity, MovementActivity, newWorkActivity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { CheckBox } from '../../atoms/checkBox/CheckBox'
import { useMinMaxDurationValidator } from '../hooks/useMinMaxDurationValidator'
import { isDefNaN } from '../../../utils/number'


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
  const [fixedStartError, setFixedStartError] = useState<string | undefined>(undefined)
  const [fixedEndError, setFixedEndError] = useState<string | undefined>(undefined)

  useEffect(() => {
    setFixedStartError(isDefNaN(activity.fixedStartTime) ? ct.errorRequired : undefined)
  }, [activity.fixedStartTime, t, setFixedStartError])

  useEffect(() => {
    setFixedEndError(isDefNaN(activity.fixedEndTime) ? ct.errorRequired : undefined)
  }, [activity.fixedEndTime, t, setFixedEndError])

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
          <div className='fixed-time-input'>
            <span>{t.fixedStartTime}:</span>
            <CheckBox
              checked={fixedStartTime !== undefined}
              onChange={checked => handleChange(
                checked ? { fixedStartTime: 0, fixedEndTime: undefined } : { fixedStartTime: undefined }
              )}
            />
            {fixedStartTime !== undefined && (
              <Input
                type='number'
                min={0}
                value={fixedStartTime}
                onChange={fixedStartTime => handleChange({ fixedStartTime: parseFloat(fixedStartTime) })}
                invalid={fixedStartError !== undefined}
                errorMessage={fixedStartError}
              />
            )}
          </div>

          <div className='fixed-time-input'>
            <span>{t.fixedEndTime}:</span>
            <CheckBox
              checked={fixedEndTime !== undefined}
              onChange={checked => handleChange(
                checked ? { fixedEndTime: 0, fixedStartTime: undefined } : { fixedEndTime: undefined }
              )}
            />
            {fixedEndTime !== undefined && (
              <Input
                type='number'
                min={0}
                value={fixedEndTime}
                onChange={fixedEndTime => handleChange({ fixedEndTime: parseFloat(fixedEndTime) })}
                invalid={fixedEndError !== undefined}
                errorMessage={fixedEndError}
              />
            )}
          </div>
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
