// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import { Input } from '../../atoms/input/Input'
import { useDispatch } from '../../../redux/useDispatch'
import { deleteRobot, setRobotInfo } from '../../../redux/cellDef/actions'
import { Robot, RobotInfo } from '../../../types/robot'
import { Button } from '../../atoms/button/Button'
import { ActivitiesForm } from '../activityForm/ActivitiesForm'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { Cross } from '../../icons/Cross'
import { DownArrow } from '../../icons/DownArrow'


interface RobotFormProps {
  robot: Robot
}

export const RobotForm = (props: RobotFormProps): JSX.Element => {
  const { cellDefPage: { robots: t } } = useSelector(selectTranslation)
  const { robot: { activities, ...robotInfo } } = props
  const [opened, setOpened] = useState(true)
  const [idError, setIdError] = useState<string | undefined>(undefined)
  const dispatch = useDispatch()

  const handleDelete = useCallback(() => {
    dispatch(deleteRobot(robotInfo.uuid))
  }, [robotInfo.uuid])

  const handleChange = useCallback((value: Partial<RobotInfo>) => {
    dispatch(setRobotInfo({
      ...robotInfo,
      ...value,
    }))
  }, [robotInfo])

  useEffect(() => {
    if (robotInfo.id === '') {
      setIdError(t.errorIdEmpty)
    } else if (robotInfo.duplicatedId) {
      setIdError(t.errorIdNotUnique)
    } else {
      setIdError(undefined)
    }
  }, [robotInfo.id, robotInfo.duplicatedId, t, setIdError])

  return (
    <div className={`robot-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='robot-form-header'>
        <span className='robot-form-title'>{t.robotLabel} {robotInfo.id}</span>
        <Button className='delete-btn' onClick={handleDelete}>
          <Cross />
        </Button>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>
          <DownArrow className={`${opened ? 'up' : 'down'}`} />
        </Button>
      </div>

      <div className='robot-form-body' style={{ maxHeight: opened ? `${100 + activities.length * 300}px` : '0' }}>
        <div className='form-row'>
          <Input
            className='id-input'
            label={`${t.id}: `}
            type='text'
            value={robotInfo.id}
            onChange={id => handleChange({ id })}
            invalid={idError !== undefined}
            errorMessage={idError}
          />

          <Input
            label={`${t.note}: `}
            type='text'
            value={robotInfo.note}
            onChange={note => handleChange({ note })}
          />
        </div>

        <ActivitiesForm
          robotUuid={robotInfo.uuid}
          activities={activities}
        />
      </div>
    </div>
  )
}
