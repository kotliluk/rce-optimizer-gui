// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './TimeOffsetsForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectTimeOffsets } from '../../../redux/cellDef/selector'
import { TimeOffsetForm } from './TimeOffsetForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addTimeOffset } from '../../../redux/cellDef/actions'
import { selectTranslation } from '../../../redux/page/selector'


export const TimeOffsetsForm = (): JSX.Element => {
  const { cellDefPage: { timeOffsets: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const timeOffsets = useSelector(selectTimeOffsets)

  const handleAddNewTimeOffset = useCallback(() => {
    dispatch(addTimeOffset())
  }, [])

  return (
    <div className='time-offsets-form'>
      <span className='time-offsets-label'>{t.timeOffsetsLabel}:&nbsp;</span>
      {timeOffsets.map((timeOffset) => (
        <TimeOffsetForm
          key={timeOffset.uuid}
          timeOffset={timeOffset}
        />
      ))}
      <div className='btns-row'>
        <Button onClick={handleAddNewTimeOffset}>
          {t.addTimeOffsetBtn}
        </Button>
      </div>
    </div>
  )
}
