// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './CollisionsForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectCollisions } from '../../../redux/cellDef/selector'
import { CollisionForm } from './CollisionForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addCollision } from '../../../redux/cellDef/actions'
import { selectTranslation } from '../../../redux/page/selector'


export const CollisionsForm = (): JSX.Element => {
  const { cellDefPage: { collisions: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const collisions = useSelector(selectCollisions)

  const handleAddNewCollision = useCallback(() => {
    dispatch(addCollision())
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
        <Button onClick={handleAddNewCollision}>
          {t.addCollisionBtn}
        </Button>
      </div>
    </div>
  )
}
