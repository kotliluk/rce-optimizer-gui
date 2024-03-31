// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Button } from '../../atoms/button/Button'
import { IdleActivity } from '../../../types/activity'
import { Position } from '../../../types/position'


interface ActivityFormProps {
  activity: IdleActivity
  onChange: (activity: IdleActivity) => void
}

export const IdleActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { activity, onChange } = props
  const [opened, setOpened] = useState(true)

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

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='activity-form-header'>
        <span className='activity-form-title'>IDLE ACTIVITY {activity.id}</span>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>{opened ? '^' : 'v'}</Button>
      </div>

      <div className='activity-form-body'>
        <span>Id</span>
        <Input
          type='text'
          value={activity.id}
          onChange={id => handleChange({ id })}
        />

        <span>Note</span>
        <Input
          type='text'
          value={activity.note}
          onChange={note => handleChange({ note })}
        />

        <span>Position</span>
        <Input
          type='number'
          value={activity.position.x}
          onChange={x => handlePositionChange({ x: parseFloat(x) })}
        />
        <Input
          type='number'
          value={activity.position.y}
          onChange={y => handlePositionChange({ y: parseFloat(y) })}
        />
        <Input
          type='number'
          value={activity.position.z}
          onChange={z => handlePositionChange({ z: parseFloat(z) })}
        />
      </div>
    </div>
  )
}
