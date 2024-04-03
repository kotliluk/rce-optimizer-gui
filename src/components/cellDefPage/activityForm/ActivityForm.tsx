// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useEffect, useState } from 'react'

import { Activity } from '../../../types/activity'
import { IdleActivityForm } from './IdleActivityForm'
import { MovementActivityForm } from './MovementActivityForm'
import { WorkActivityForm } from './WorkActivityForm'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'


interface ActivityFormProps {
  activity: Activity
  onChange: (activity: Activity) => void
  onDelete: (activityUuid: string) => void
}

export const ActivityForm = (props: ActivityFormProps): JSX.Element | null => {
  const { cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, onDelete } = props
  const [idError, setIdError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (activity.id === '') {
      setIdError(t.errorIdEmpty)
    } else if (activity.duplicatedId) {
      setIdError(t.errorIdNotUnique)
    } else {
      setIdError(undefined)
    }
  }, [activity.id, activity.duplicatedId, t, setIdError])

  if (activity.type === 'IDLE') {
    return (
      <IdleActivityForm
        activity={activity}
        onChange={onChange}
        idError={idError}
      />
    )
  }

  if (activity.type === 'MOVEMENT') {
    return (
      <MovementActivityForm
        activity={activity}
        onChange={onChange}
        onDelete={onDelete}
        idError={idError}
      />
    )
  }

  if (activity.type === 'WORK') {
    return (
      <WorkActivityForm
        activity={activity}
        onChange={onChange}
        onDelete={onDelete}
        idError={idError}
      />
    )
  }

  return null
}
