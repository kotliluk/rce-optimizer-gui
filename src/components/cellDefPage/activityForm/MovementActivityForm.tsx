// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { MovementActivity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { CheckBox } from '../../atoms/checkBox/CheckBox'


interface ActivityFormProps {
  activity: MovementActivity
  onChange: (activity: MovementActivity) => void
  onDelete: (activityUuid: string) => void
  idError: string | undefined
}

// TODO - Error - minDuration > maxDuration
// TODO - Error - both fixed start and fixed end specified - use WorkActivity

export const MovementActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, onDelete, idError } = props
  const [opened, setOpened] = useState(true)

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
          />

          <Input
            className='duration-input'
            label={`${t.maxDuration}: `}
            type='number'
            min={0}
            value={maxDuration}
            onChange={maxDuration => handleChange({ maxDuration: parseFloat(maxDuration) })}
          />
        </div>

        <div className='form-row'>
          <div className='fixed-time-input'>
            <span>{t.fixedStartTime}</span>
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
              />
            )}
          </div>

          <div className='fixed-time-input'>
            <span>{t.fixedEndTime}</span>
            <CheckBox
              checked={fixedEndTime !== undefined}
              onChange={checked => handleChange({ fixedEndTime: checked ? 0 : undefined })}
            />
            {fixedEndTime !== undefined && (
              <Input
                type='number'
                min={0}
                value={fixedEndTime}
                onChange={fixedEndTime => handleChange({ fixedEndTime: parseFloat(fixedEndTime) })}
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
