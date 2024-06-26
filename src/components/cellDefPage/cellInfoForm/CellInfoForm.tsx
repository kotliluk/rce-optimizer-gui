// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import './CellInfoForm.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectCellInfo } from '../../../redux/cellDef/selector'
import { Input } from '../../atoms/input/Input'
import { useDispatch, useThunkDispatch } from '../../../redux/useDispatch'
import { loadFromJSON, setCellInfo } from '../../../redux/cellDef/actions'
import { CellInfo } from '../../../types/cellInfo'
import { selectTranslation } from '../../../redux/page/selector'
import { isDefNaN } from '../../../utils/number'
import { Button } from '../../atoms/button/Button'
import { openFile } from '../../../utils/file'

/**
 * Definition of overall information about the cell.
 */
export const CellInfoForm = (): JSX.Element => {
  const { common: ct, cellDefPage: { cellInfo: t } } = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const thunkDispatch = useThunkDispatch()
  const cellInfo = useSelector(selectCellInfo)
  const [nameError, setNameError] = useState<string | undefined>(undefined)
  const [cycleTimeError, setCycleTimeError] = useState<string | undefined>(undefined)

  useEffect(() => {
    setNameError(cellInfo.name.length === 0 ? ct.errorRequired : undefined)
  }, [cellInfo.name, t, setNameError])

  useEffect(() => {
    setCycleTimeError(isDefNaN(cellInfo.cycleTime) ? ct.errorRequired : undefined)
  }, [cellInfo.cycleTime, t, setCycleTimeError])

  const handleLoadJSON = useCallback(() => {
    openFile('application/JSON')
      .then((file) => thunkDispatch(loadFromJSON(file.text ?? '')))
      .catch(console.error)
  }, [])

  const handleChange = useCallback((value: Partial<CellInfo>) => {
    dispatch(setCellInfo({
      ...cellInfo,
      ...value,
    }))
  }, [cellInfo])

  return (
    <div className='cell-info-form'>
      <div className='form-row'>
        <Input
          label={`${t.name}: `}
          type='text'
          value={cellInfo.name}
          onChange={name => handleChange({ name })}
          invalid={nameError !== undefined}
          errorMessage={nameError}
        />

        <Input
          label={`${t.cycleTime}: `}
          type='number'
          value={cellInfo.cycleTime}
          onChange={cycleTime => handleChange({ cycleTime: parseFloat(cycleTime) })}
          invalid={cycleTimeError !== undefined}
          errorMessage={cycleTimeError}
        />

        <Button
          className="text-btn"
          onClick={handleLoadJSON}
        >
          {t.loadFromJSONBtn}
        </Button>
      </div>

      <div className='form-row'>
        <Input
          label={`${t.note}: `}
          type='text'
          className='note-input'
          value={cellInfo.note}
          onChange={note => handleChange({ note })}
        />
      </div>
    </div>
  )
}
