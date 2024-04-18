// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch } from '../../../redux/useDispatch'
import { deleteCollision, setCollisionInfo } from '../../../redux/cellDef/actions'
import { Collision } from '../../../types/collision'
import { Button } from '../../atoms/button/Button'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { Cross } from '../../icons/Cross'
import { DownArrow } from '../../icons/DownArrow'
import { selectActivities } from '../../../redux/cellDef/selector'
import { Select, SelectValue } from '../../atoms/select/Select'
import { OptionalInput } from '../../atoms/input/OptionalInput'
import { useNegativeDefNaNValidator } from '../hooks/useNegativeDefNaNValidator'


interface CollisionFormProps {
  collision: Collision
}

export const CollisionForm = (props: CollisionFormProps): JSX.Element => {
  const { collision } = props
  const { common: ct, cellDefPage: { collisions: t } } = useSelector(selectTranslation)
  const allActivities = useSelector(selectActivities)
  const [activities, setActivities] = useState<SelectValue[]>([])
  const [opened, setOpened] = useState(true)
  const [aIdError, setAIdError] = useState<string | undefined>(undefined)
  const [bIdError, setBIdError] = useState<string | undefined>(undefined)
  const [bPrevError] = useNegativeDefNaNValidator(collision.bPrevSkipRatio, ct.errorRequired, t.errorNegativeSkipRatio)
  const [bNextError] = useNegativeDefNaNValidator(collision.bNextSkipRatio, ct.errorRequired, t.errorNegativeSkipRatio)
  const dispatch = useDispatch()

  const handleDelete = useCallback(() => {
    dispatch(deleteCollision(collision.uuid))
  }, [collision.uuid])

  const handleAIdChange = useCallback((aUuid: string) => {
    const activity = allActivities.find((a) => a.uuid === aUuid) ?? { id: '-', robotId: '-', text: '-' }

    dispatch(setCollisionInfo({
      ...collision,
      aUuid,
      aId: activity.id,
      aRobotId: activity.robotId,
      aText: activity.text,
    }))
  }, [collision, allActivities])

  const handleBIdChange = useCallback((bUuid: string) => {
    const activity = allActivities.find((a) => a.uuid === bUuid) ?? { id: '-', robotId: '-', text: '-' }

    dispatch(setCollisionInfo({
      ...collision,
      bUuid,
      bId: activity.id,
      bRobotId: activity.robotId,
      bText: activity.text,
    }))
  }, [collision, allActivities])

  const handleRatioChange = useCallback((value: string | undefined, type: 'PREV' | 'NEXT') => {
    const numValue = (value === undefined) ? undefined : parseFloat(value)
    const newCollisionObj = { ...collision }
    const newValue = (numValue === undefined) ? undefined : ((numValue < 0) ? 0 : ((numValue > 100) ? 100 : numValue))
    if (type === 'PREV') {
      newCollisionObj.bPrevSkipRatio = newValue
    } else {
      newCollisionObj.bNextSkipRatio = newValue
    }
    dispatch(setCollisionInfo(newCollisionObj))
  }, [collision])

  useEffect(() => {
    setActivities([
      { value: '-', text: '-' },
      ...allActivities.map((a) => ({ value: a.uuid, text: a.text })),
    ])
  }, [allActivities, t, setActivities])

  useEffect(() => {
    if (collision.aUuid !== '-' && collision.aRobotId === collision.bRobotId) {
      setAIdError(t.errorSameRobotIds)
      setBIdError(t.errorSameRobotIds)
    } else {
      setAIdError(collision.aUuid === '-' ? ct.errorRequired : undefined)
      setBIdError(collision.bUuid === '-' ? ct.errorRequired : undefined)
    }
  }, [collision.aUuid, collision.bUuid, t, setAIdError, setBIdError])

  return (
    <div className={`collision-form ${opened ? 'body-opened' : 'body-hidden'}`}>
      <div className='collision-form-header'>
        <span className='collision-form-title'>
          {t.collisionLabel} ({collision.aText}, {collision.bText})
        </span>
        <Button className='delete-btn' onClick={handleDelete}>
          <Cross />
        </Button>
        <Button className='toggle-btn' onClick={() => setOpened(v => !v)}>
          <DownArrow className={`${opened ? 'up' : 'down'}`} />
        </Button>
      </div>

      <div className='collision-form-body'>
        <div className='form-row'>
          <div className='id-wrapper'>
            <span className='id-label'>{t.aId}:</span>
            <Select
              className='id-input'
              selected={collision.aUuid}
              values={activities}
              onChange={aId => handleAIdChange(aId)}
              invalid={aIdError !== undefined}
              errorMessage={aIdError}
            />
          </div>

          <div className='id-wrapper'>
            <span className='id-label'>{t.bId}:</span>
            <Select
              className='id-input'
              selected={collision.bUuid}
              values={activities}
              onChange={bId => handleBIdChange(bId)}
              invalid={bIdError !== undefined}
              errorMessage={bIdError}
            />
          </div>
        </div>

        <div className='form-row'>
          <OptionalInput
            className='skip-ratio-input'
            type='number'
            label={`${t.bPrevSkipRatio}:`}
            value={collision.bPrevSkipRatio}
            min={0}
            max={100}
            onChange={(value) => handleRatioChange(value, 'PREV')}
            defaultDefinedValue={'0'}
            invalid={bPrevError !== undefined}
            errorMessage={bPrevError}
          />

          <OptionalInput
            className='skip-ratio-input'
            type='number'
            label={`${t.bNextSkipRatio}:`}
            value={collision.bNextSkipRatio}
            min={0}
            max={100}
            onChange={(value) => handleRatioChange(value, 'NEXT')}
            defaultDefinedValue={'0'}
            invalid={bNextError !== undefined}
            errorMessage={bNextError}
          />
        </div>
      </div>
    </div>
  )
}
