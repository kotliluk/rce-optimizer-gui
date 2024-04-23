// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './ActivitiesForm.scss'
import { ActivityForm } from './ActivityForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch, useThunkDispatch } from '../../../redux/useDispatch'
import { addActivity, deleteActivity, setActivityInfo } from '../../../redux/cellDef/actions'
import { Activity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'


interface ActivitiesFormProps {
  robotUuid: string
  activities: Activity[]
}

export const ActivitiesForm = (props: ActivitiesFormProps): JSX.Element => {
  const { cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { robotUuid, activities } = props
  const dispatch = useDispatch()
  const thunkDispatch = useThunkDispatch()

  const handleAddNewActivity = useCallback((type: 'MOVEMENT' | 'WORK', before?: string) => {
    thunkDispatch(addActivity(robotUuid, type, before))
  }, [robotUuid])

  const handleDeleteActivity = useCallback((activityUuid: string) => {
    dispatch(deleteActivity(robotUuid, activityUuid))
  }, [robotUuid])

  const handleChangeActivity = useCallback((activity: Activity) => {
    dispatch(setActivityInfo(robotUuid, activity))
  }, [robotUuid])

  return (
    <div className='activities-form'>
      <span>{t.activitiesLabel}:</span>
      {activities.map((activity) => (
        <ActivityForm
          key={activity.uuid}
          activity={activity}
          onDelete={handleDeleteActivity}
          onChange={handleChangeActivity}
          onAddBefore={handleAddNewActivity}
        />
      ))}
      <div className='btns-row'>
        <Button className='text-btn' onClick={() => handleAddNewActivity('MOVEMENT')}>
          {t.addMovementBtn}
        </Button>
        <Button className='text-btn' onClick={() => handleAddNewActivity('WORK')}>
          {t.addWorkBtn}
        </Button>
      </div>
    </div>
  )
}
