// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import { useSelector } from '../../../redux/useSelector'
import { selectRobots } from '../../../redux/cellDef/selector'
import { RobotForm } from './RobotForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addRobot, checkRobots } from '../../../redux/cellDef/actions'


export const RobotsForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const robots = useSelector(selectRobots)

  const handleAddNewRobot = useCallback(() => {
    dispatch(addRobot())
  }, [])

  const handleCheckRobots = useCallback(() => {
    dispatch(checkRobots())
  }, [])

  return (
    <div>
      ROBOTS
      {robots.map((robot) => (
        <RobotForm
          key={robot.uuid}
          robot={robot}
        />
      ))}
      <Button onClick={handleAddNewRobot}>
        ADD NEW
      </Button>
      <Button onClick={handleCheckRobots}>
        CHECK ROBOTS
      </Button>
    </div>
  )
}
