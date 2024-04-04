// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Activity, newMovementActivity, WorkActivity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { CheckBox } from '../../atoms/checkBox/CheckBox'
import { isDefNaN } from '../../../utils/number'


interface ActivityFormProps {
  activity: WorkActivity
  onChange: (activity: Activity) => void
  onDelete: (activityUuid: string) => void
  idError: string | undefined
}

export const WorkActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { common: ct, cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, onDelete, idError } = props
  const [opened, setOpened] = useState(true)
  const [fixedStartError, setFixedStartError] = useState<string | undefined>(undefined)

  useEffect(() => {
    setFixedStartError(isDefNaN(activity.fixedStartTime) ? ct.errorRequired : undefined)
  }, [activity.fixedStartTime, t, setFixedStartError])

  const handleChange = useCallback((value: Partial<WorkActivity>) => {
    onChange({
      ...activity,
      ...value,
    })
  }, [activity])

  const { id, uuid, duration, fixedStartTime, note } = activity

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'} work`}>
      <ActivityHeader
        bodyOpened={opened}
        openedTitle={`${t.workActivityLabel} ${id}`}
        closedTitle={`${t.workActivityLabel} ${id} (${duration} s)`}
        changeBtnLabel={t.changeToMovementActivity}
        onChange={() => onChange(newMovementActivity(uuid))}
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
            label={`${t.duration}: `}
            type='number'
            min={0}
            value={duration}
            onChange={duration => handleChange({ duration: parseFloat(duration) })}
          />
        </div>

        <div className='form-row'>
          <div className='fixed-time-input'>
            <span>{t.fixedStartTime}:</span>
            <CheckBox
              checked={fixedStartTime !== undefined}
              onChange={checked => handleChange({ fixedStartTime: checked ? 0 : undefined })}
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
