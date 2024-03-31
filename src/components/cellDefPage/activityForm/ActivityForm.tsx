// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './ActivityForm.scss'
import { Activity } from '../../../types/activity'
import { IdleActivityForm } from './IdleActivityForm'
import { MovementActivityForm } from './MovementActivityForm'
import { WorkActivityForm } from './WorkActivityForm'


interface ActivityFormProps {
  activity: Activity
  onChange: (activity: Activity) => void
  onDelete: (activityUuid: string) => void
}

export const ActivityForm = (props: ActivityFormProps): JSX.Element | null => {
  const { activity, onChange, onDelete } = props

  if (activity.type === 'IDLE') {
    return (
      <IdleActivityForm
        activity={activity}
        onChange={onChange}
      />
    )
  }

  if (activity.type === 'MOVEMENT') {
    return (
      <MovementActivityForm
        activity={activity}
        onChange={onChange}
        onDelete={onDelete}
      />
    )
  }

  if (activity.type === 'WORK') {
    return (
      <WorkActivityForm
        activity={activity}
        onChange={onChange}
        onDelete={onDelete}
      />
    )
  }

  return null
}
