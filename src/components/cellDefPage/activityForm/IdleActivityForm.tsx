// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Activity, IdleActivity } from '../../../types/activity'
import { formatPosition, Position } from '../../../types/position'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { useMinMaxDurationValidator } from '../hooks/useMinMaxDurationValidator'


interface ActivityFormProps {
  activity: IdleActivity
  onChange: (activity: Activity) => void
  idError: string | undefined
}

export const IdleActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { common: ct, cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, idError } = props
  const [opened, setOpened] = useState(true)

  const [durationError, minDurationError, maxDurationError] = useMinMaxDurationValidator(activity, ct, t)

  const handleChange = useCallback((value: Partial<IdleActivity>) => {
    onChange({
      ...activity,
      ...value,
    })
  }, [activity])

  const handlePositionChange = useCallback((value: Partial<Position>) => {
    onChange({
      ...activity,
      position: { ...activity.position, ...value },
    })
  }, [activity])

  const { id, position, minDuration, maxDuration, note } = activity

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'} idle`}>
      <ActivityHeader
        bodyOpened={opened}
        openedTitle={`${t.idleActivityLabel} ${id}`}
        closedTitle={`${t.idleActivityLabel} ${id} ${formatPosition(position)} (${minDuration}-${maxDuration} s)`}
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
          <div className='position-input'>
            <span className='__input-label'>{t.position}:&nbsp;</span>
            <Input
              type='number'
              value={position.x}
              onChange={x => handlePositionChange({ x: parseFloat(x) })}
            />
            <Input
              type='number'
              value={position.y}
              onChange={y => handlePositionChange({ y: parseFloat(y) })}
            />
            <Input
              type='number'
              value={position.z}
              onChange={z => handlePositionChange({ z: parseFloat(z) })}
            />
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
