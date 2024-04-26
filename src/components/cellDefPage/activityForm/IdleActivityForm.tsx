// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { Activity, IdleActivity } from '../../../types/activity'
import { formatPosition, Position } from '../../../types/position'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ActivityHeader } from './ActivityHeader'
import { isDefNaN } from '../../../utils/number'


interface ActivityFormProps {
  activity: IdleActivity
  onChange: (activity: Activity) => void
  idError: string | undefined
}

/**
 * An idle activity definition card.
 */
export const IdleActivityForm = (props: ActivityFormProps): JSX.Element => {
  const { common: ct, cellDefPage: { robots: { activities: t } } } = useSelector(selectTranslation)
  const { activity, onChange, idError } = props
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

  const { id, position, note } = activity

  const isXNaN = isDefNaN(position.x)
  const isYNaN = isDefNaN(position.y)
  const isZNaN = isDefNaN(position.z)

  return (
    <div className={`activity-form ${opened ? 'body-opened' : 'body-hidden'} idle`}>
      <ActivityHeader
        bodyOpened={opened}
        openedTitle={`${t.idleActivityLabel} ${id}`}
        closedTitle={`${t.idleActivityLabel} ${id} ${formatPosition(position)}`}
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

          <div className={'position-input'}>
            <span className='__input-label'>{t.position}:&nbsp;</span>
            <Input
              type='number'
              value={position.x}
              onChange={x => handlePositionChange({ x: parseFloat(x) })}
              invalid={isXNaN || activity.equalStartForMovement || activity.equalEndForMovement}
              errorMessage={isXNaN ? ct.errorRequired : t.errorMovementWithSamePositions}
            />
            <Input
              type='number'
              value={position.y}
              onChange={y => handlePositionChange({ y: parseFloat(y) })}
              invalid={isYNaN || activity.equalStartForMovement || activity.equalEndForMovement}
              errorMessage={isYNaN ? ct.errorRequired : t.errorMovementWithSamePositions}
            />
            <Input
              type='number'
              value={position.z}
              onChange={z => handlePositionChange({ z: parseFloat(z) })}
              invalid={isZNaN || activity.equalStartForMovement || activity.equalEndForMovement}
              errorMessage={isZNaN ? ct.errorRequired : t.errorMovementWithSamePositions}
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
