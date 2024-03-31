// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Button } from '../../atoms/button/Button'
import { MovementActivity } from '../../../types/activity'


interface ActivityFormProps {
  activity: MovementActivity
  onChange: (activity: MovementActivity) => void
  onDelete: (activityUuid: string) => void
  idError: string | undefined
}

export const MovementActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { activity, onChange, onDelete, idError } = props
  const [opened, setOpened] = useState(true)

  const handleChange = useCallback((value: Partial<MovementActivity>) => {
    onChange({
      ...activity,
      ...value,
    })
  }, [activity])

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='activity-form-header'>
        <span className='activity-form-title'>MOVEMENT ACTIVITY {activity.id}</span>
        <Button className='delete-btn' onClick={() => onDelete(activity.uuid)}>X</Button>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>{opened ? '^' : 'v'}</Button>
      </div>

      <div className='activity-form-body'>
        <span>Id</span>
        <Input
          type='text'
          value={activity.id}
          onChange={id => handleChange({ id })}
          invalid={idError !== undefined}
          errorMessage={idError}
        />

        <span>Note</span>
        <Input
          type='text'
          value={activity.note}
          onChange={note => handleChange({ note })}
        />

        <span>Minimal duration</span>
        <Input
          type='number'
          value={activity.minDuration}
          onChange={minDuration => handleChange({ minDuration: parseFloat(minDuration) })}
        />

        <span>Maximal duration</span>
        <Input
          type='number'
          value={activity.maxDuration}
          onChange={maxDuration => handleChange({ maxDuration: parseFloat(maxDuration) })}
        />

        {/* TODO - undefined checkbox */}
        {/* <span>Fixed start time</span>*/}
        {/* <Input*/}
        {/*  type='number'*/}
        {/*  value={activity.fixedStartTime}*/}
        {/*  onChange={fixedStartTime => handleChange({ fixedStartTime: parseFloat(fixedStartTime) })}*/}
        {/* />*/}

        {/* <span>Fixed end time</span>*/}
        {/* <Input*/}
        {/*  type='number'*/}
        {/*  value={activity.fixedEndTime}*/}
        {/*  onChange={fixedEndTime => handleChange({ fixedEndTime: parseFloat(fixedEndTime) })}*/}
        {/* />*/}
      </div>
    </div>
  )
}
