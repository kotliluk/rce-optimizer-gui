// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Button } from '../../atoms/button/Button'
import { WorkActivity } from '../../../types/activity'


interface ActivityFormProps {
  activity: WorkActivity
  onChange: (activity: WorkActivity) => void
  onDelete: (activityUuid: string) => void
}

export const WorkActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { activity, onChange, onDelete } = props
  const [opened, setOpened] = useState(true)

  const handleChange = useCallback((value: Partial<WorkActivity>) => {
    onChange({
      ...activity,
      ...value,
    })
  }, [activity])

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='activity-form-header'>
        <span className='activity-form-title'>WORK ACTIVITY {activity.id}</span>
        <Button className='delete-btn' onClick={() => onDelete(activity.uuid)}>X</Button>
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

        <span>Duration</span>
        <Input
          type='number'
          value={activity.duration}
          onChange={duration => handleChange({ duration: parseFloat(duration) })}
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
