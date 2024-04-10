// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'

import './CellDefControl.scss'
import { useSelector } from '../../../redux/useSelector'
import {
  selectAllChecked, selectCellInfo, selectCollisions, selectRobots, selectTimeOffsets,
} from '../../../redux/cellDef/selector'
import { useThunkDispatch } from '../../../redux/useDispatch'
import { selectTranslation } from '../../../redux/page/selector'
import { createCellDefJSON } from '../../../types/cellDefJson'
import { Button } from '../../atoms/button/Button'
import { checkAll } from '../../../redux/cellDef/actions'


export const CellDefControl = (): JSX.Element => {
  const { cellDefPage: { cellDefControl: t } } = useSelector(selectTranslation)
  const thunkDispatch = useThunkDispatch()

  const [cellDef, setCellDef] = useState<string | null>(null)
  const [checkError, setCheckError] = useState<string | undefined>(undefined)

  const allChecked = useSelector(selectAllChecked)
  const cellInfo = useSelector(selectCellInfo)
  const robots = useSelector(selectRobots)
  const offsets = useSelector(selectTimeOffsets)
  const collisions = useSelector(selectCollisions)

  const handleCheckAll = useCallback(() => {
    if (allChecked === 'OK') {
      return
    }
    thunkDispatch(checkAll())
  }, [allChecked, thunkDispatch])

  const handleDownloadJSON = useCallback((cellDefArg: string | null) => {
    let jsonStr = cellDefArg
    if (cellDefArg === null) {
      const json = createCellDefJSON(cellInfo, robots, offsets, collisions)
      jsonStr = JSON.stringify(json, null, 2)
      setCellDef(jsonStr)
    }

    const blob = new Blob([jsonStr as string], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = cellInfo.name + '.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }, [])

  useEffect(() => {
    if (allChecked === 'errorRobotCheck') {
      setCheckError(t.errorRobotCheck)
    } else if (allChecked === 'errorTimeOffsetsCheck') {
      setCheckError(t.errorTimeOffsetsCheck)
    } else if (allChecked === 'errorCollisionsCheck') {
      setCheckError(t.errorCollisionsCheck)
    } else if (allChecked.startsWith('errorActivityOrder')) {
      setCheckError(`${t.errorActivityOrder}${allChecked.slice(19)}`)
    } else if (allChecked.startsWith('errorMinDuration')) {
      setCheckError(`${t.errorMinDuration}${allChecked.slice(17)}`)
    } else {
      setCheckError(undefined)
    }
  }, [allChecked, t, setCheckError])

  const btnCheckStyle = (allChecked === 'OK' || allChecked === 'NO') ? allChecked : 'ERROR'

  return (
    <div className='cell-def-control'>
      <div className='btns-row'>
        <Button
          className={`text-btn check-${btnCheckStyle}`}
          onClick={handleCheckAll}
          errorMessage={checkError}
        >
          1) {t.checkAll}
        </Button>

        <Button
          className='text-btn'
          onClick={() => handleDownloadJSON(cellDef)}
          disabled={allChecked !== 'OK'}
        >
          2) {t.downloadJSON}
        </Button>
      </div>
    </div>
  )
}
