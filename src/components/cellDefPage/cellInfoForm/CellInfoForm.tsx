// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback } from 'react'

import { useSelector } from '../../../redux/useSelector'
import { selectCellInfo } from '../../../redux/cellDef/selector'
import { Input } from '../../atoms/input/Input'
import { useDispatch } from '../../../redux/useDispatch'
import { setCellInfo } from '../../../redux/cellDef/actions'
import { CellInfo } from '../../../types/cellInfo'


export const CellInfoForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const cellInfo = useSelector(selectCellInfo)

  const handleChange = useCallback((value: Partial<CellInfo>) => {
    dispatch(setCellInfo({
      ...cellInfo,
      ...value,
    }))
  }, [cellInfo])

  return (
    <div>
      <span>Name</span>
      <Input
        type='text'
        value={cellInfo.name}
        onChange={name => handleChange({ name })}
      />

      <span>Note</span>
      <Input
        type='text'
        value={cellInfo.note}
        onChange={note => handleChange({ note })}
      />

      <span>Cycle time</span>
      <Input
        type='number'
        value={cellInfo.cycleTime}
        onChange={cycleTime => handleChange({ cycleTime: parseFloat(cycleTime) })}
      />
    </div>
  )
}
