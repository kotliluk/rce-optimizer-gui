// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import './TimeOffsetsForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectTimeOffsetsChecked, selectTimeOffsets } from '../../../redux/cellDef/selector'
import { TimeOffsetForm } from './TimeOffsetForm'
import { Button } from '../../atoms/button/Button'
import { useDispatch } from '../../../redux/useDispatch'
import { addTimeOffset, checkTimeOffsets } from '../../../redux/cellDef/actions'
import { selectTranslation } from '../../../redux/page/selector'


/**
 * A list of time offsets defined in the cell.
 */
export const TimeOffsetsForm = (): JSX.Element => {
  const { cellDefPage: { timeOffsets: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const timeOffsets = useSelector(selectTimeOffsets)
  const timeOffsetsChecked = useSelector(selectTimeOffsetsChecked)

  const handleAddNewTimeOffset = useCallback(() => {
    dispatch(addTimeOffset())
  }, [])

  const handleCheckTimeOffsets = useCallback(() => {
    dispatch(checkTimeOffsets())
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
        <Button
          className='text-btn'
          onClick={handleAddNewTimeOffset}
        >
          {t.addTimeOffsetBtn}
        </Button>
        <Button
          className={`text-btn check-btn check-${timeOffsetsChecked}`}
          onClick={handleCheckTimeOffsets}
          disabled={timeOffsetsChecked !== 'NO'}
        >
          {t.checkTimeOffsetsBtn[timeOffsetsChecked]}
        </Button>
      </div>
    </div>
  )
}
