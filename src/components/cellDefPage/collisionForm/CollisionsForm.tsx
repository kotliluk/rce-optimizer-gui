// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './CollisionsForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectCollisions, selectCollisionsChecked } from '../../../redux/cellDef/selector'
import { CollisionForm } from './CollisionForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addCollision, checkCollisions } from '../../../redux/cellDef/actions'
import { selectTranslation } from '../../../redux/page/selector'


/**
 * A list of collisions defined in the cell.
 */
export const CollisionsForm = (): JSX.Element => {
  const { cellDefPage: { collisions: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const collisions = useSelector(selectCollisions)
  const collisionsChecked = useSelector(selectCollisionsChecked)

  const handleAddNewCollision = useCallback(() => {
    dispatch(addCollision())
  }, [])

  const handleCheckCollisions = useCallback(() => {
    dispatch(checkCollisions())
  }, [])

  return (
    <div className='collisions-form'>
      <span className='collisions-label'>{t.collisionsLabel}:&nbsp;</span>
      {collisions.map((collision) => (
        <CollisionForm
          key={collision.uuid}
          collision={collision}
        />
      ))}
      <div className='btns-row'>
        <Button
          className='text-btn'
          onClick={handleAddNewCollision}
        >
          {t.addCollisionBtn}
        </Button>
        <Button
          className={`text-btn check-btn check-${collisionsChecked}`}
          onClick={handleCheckCollisions}
          disabled={collisionsChecked !== 'NO'}
        >
          {t.checkCollisionsBtn[collisionsChecked]}
        </Button>
      </div>
    </div>
  )
}
