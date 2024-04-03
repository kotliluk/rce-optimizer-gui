// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './RobotsForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectRobots } from '../../../redux/cellDef/selector'
import { RobotForm } from './RobotForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addRobot, checkRobots } from '../../../redux/cellDef/actions'
import { selectTranslation } from '../../../redux/page/selector'


export const RobotsForm = (): JSX.Element => {
  const { cellDefPage: { robots: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const robots = useSelector(selectRobots)

  const handleAddNewRobot = useCallback(() => {
    dispatch(addRobot())
  }, [])

  const handleCheckRobots = useCallback(() => {
    dispatch(checkRobots())
  }, [])

  return (
    <div className='robots-form'>
      <span className='robots-label'>{t.robotsLabel}:&nbsp;</span>
      {robots.map((robot) => (
        <RobotForm
          key={robot.uuid}
          robot={robot}
        />
      ))}
      <div className='btns-row'>
        <Button onClick={handleAddNewRobot}>
          {t.addRobotBtn}
        </Button>
        <Button onClick={handleCheckRobots}>
          {t.checkRobotsBtn}
        </Button>
      </div>
    </div>
  )
}
