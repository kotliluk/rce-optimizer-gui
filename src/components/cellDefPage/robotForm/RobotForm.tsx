// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useState } from 'react'

import './RobotForm.scss'
import { Input } from '../../atoms/input/Input'
import { useDispatch } from '../../../redux/useDispatch'
import { deleteRobot, setRobotInfo } from '../../../redux/cellDef/actions'
import { Robot, RobotInfo } from '../../../types/robot'
import { Button } from '../../atoms/button/Button'
import { ActivitiesForm } from '../activityForm/ActivitiesForm'


interface RobotFormProps {
  robot: Robot
}

export const RobotForm = (props: RobotFormProps): JSX.Element => {
  const { robot: { activities, ...robotInfo } } = props
  const [opened, setOpened] = useState(true)
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

  return (
    <div className={`robot-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='robot-form-header'>
        <span className='robot-form-title'>ROBOT {robotInfo.id}</span>
        <Button className='delete-btn' onClick={handleDelete}>X</Button>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>{opened ? '^' : 'v'}</Button>
      </div>

      <div className='robot-form-body'>
        <span>Id</span>
        <Input
          type='text'
          value={robotInfo.id}
          onChange={id => handleChange({ id })}
        />

        <span>Note</span>
        <Input
          type='text'
          value={robotInfo.note}
          onChange={note => handleChange({ note })}
        />

        <ActivitiesForm
          robotUuid={robotInfo.uuid}
          activities={activities}
        />
      </div>
    </div>
  )
}
