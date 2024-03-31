// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import { ActivityForm } from './ActivityForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addActivity, deleteActivity, setActivityInfo } from '../../../redux/cellDef/actions'
import { Activity } from '../../../types/activity'


interface ActivitiesFormProps {
  robotUuid: string
  activities: Activity[]
}

export const ActivitiesForm = (props: ActivitiesFormProps): JSX.Element => {
  const { robotUuid, activities } = props
  const dispatch = useDispatch()

  const handleAddNewActivity = useCallback((type: 'MOVEMENT' | 'WORK') => {
    dispatch(addActivity(robotUuid, type))
  }, [robotUuid])

  const handleDeleteActivity = useCallback((activityUuid: string) => {
    dispatch(deleteActivity(robotUuid, activityUuid))
  }, [robotUuid])

  const handleChangeActivity = useCallback((activity: Activity) => {
    dispatch(setActivityInfo(robotUuid, activity))
  }, [robotUuid])

  return (
    <div>
      ACTIVITIES
      {activities.map((activity) => (
        <ActivityForm
          key={activity.uuid}
          activity={activity}
          onDelete={handleDeleteActivity}
          onChange={handleChangeActivity}
        />
      ))}
      <Button onClick={() => handleAddNewActivity('MOVEMENT')}>
        ADD NEW
      </Button>
    </div>
  )
}
