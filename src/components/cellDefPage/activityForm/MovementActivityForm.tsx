// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { MovementActivity } from '../../../types/activity'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'


interface ActivityFormProps {
  activity: MovementActivity
  onChange: (activity: MovementActivity) => void
  onDelete: (activityUuid: string) => void
  idError: string | undefined
}

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

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'} movement`}>
      <ActivityHeader
        bodyOpened={opened}
        openedTitle={`${t.movementActivityLabel} ${activity.id}`}
        closedTitle={`${t.movementActivityLabel} ${activity.id} (${activity.minDuration}-${activity.maxDuration} s)`}
        onDelete={() => onDelete(activity.uuid)}
        setBodyOpened={setOpened}
      />

      <div className='activity-form-body'>
        <div className='form-row'>
          <Input
            className='id-input'
            label={`${t.id}: `}
            type='text'
            value={activity.id}
            onChange={id => handleChange({ id })}
            invalid={idError !== undefined}
            errorMessage={idError}
          />

          <Input
            className='duration-input'
            label={`${t.minDuration}: `}
            type='number'
            value={activity.minDuration}
            onChange={minDuration => handleChange({ minDuration: parseFloat(minDuration) })}
          />

          <Input
            className='duration-input'
            label={`${t.maxDuration}: `}
            type='number'
            value={activity.maxDuration}
            onChange={maxDuration => handleChange({ maxDuration: parseFloat(maxDuration) })}
          />
        </div>

        <div className='form-row'>
          <Input
            label={`${t.note}: `}
            type='text'
            className='note-input'
            value={activity.note}
            onChange={note => handleChange({ note })}
          />
        </div>

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
