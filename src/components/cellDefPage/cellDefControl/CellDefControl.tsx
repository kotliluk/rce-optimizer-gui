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
import { heartBeat } from '../../../apollo/queries/heartBeat'
import { useOptimizeMutation } from '../../../apollo/mutations/optimize'
import { CellDefResult } from './CellDefResult'


export const CellDefControl = (): JSX.Element => {
  const { cellDefPage: { cellDefControl: t } } = useSelector(selectTranslation)
  const thunkDispatch = useThunkDispatch()
  const [optimizeMutation] = useOptimizeMutation()

  const [checkError, setCheckError] = useState<string | undefined>(undefined)
  const [heartBeatStatus, setHeartBeatStatus] = useState<boolean>(false)
  const [optimizationStatus, setOptimizationStatus] = useState<string | null>(null)
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null)
  const [optimizationGantt, setOptimizationGantt] = useState<string | null>(null)

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

  const handleDownloadJSON = useCallback(() => {
    const json = createCellDefJSON(cellInfo, robots, offsets, collisions)
    const jsonStr = JSON.stringify(json, null, 4)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = cellInfo.name + '.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }, [cellInfo, robots, offsets, collisions])

  const handleSendToServer = useCallback(() => {
    setOptimizationStatus(null)
    setOptimizationResult(null)
    setOptimizationGantt(null)
    const json = createCellDefJSON(cellInfo, robots, offsets, collisions)
    const jsonStr = JSON.stringify(json)
    optimizeMutation({ variables: { cellDefJsonStr: jsonStr } })
      .then(({ data }) => {
        if (data) {
          setOptimizationStatus(data.optimize.status)
          setOptimizationResult(data.optimize.result_json)
          setOptimizationGantt(data.optimize.gantt)
        } else {
          const msg = 'ERROR_UNEXPECTED'
          console.error(msg)
          setOptimizationStatus(msg)
        }
      })
      .catch((e) => {
        const msg = `ERROR_UNEXPECTED: ${e}`
        console.error(msg)
        setOptimizationStatus(msg)
      })
  }, [cellInfo, robots, offsets, collisions, setOptimizationStatus, setOptimizationResult, setOptimizationGantt])

  useEffect(() => {
    heartBeat().then((status) => setHeartBeatStatus(status)).catch(console.error)
    const iid = setInterval(() => {
      heartBeat().then((status) => setHeartBeatStatus(status)).catch(console.error)
    }, 15000)
    return () => clearInterval(iid)
  }, [setHeartBeatStatus])

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
          {t.checkAll}
        </Button>

        <Button
          className='text-btn'
          onClick={handleDownloadJSON}
          disabled={allChecked !== 'OK'}
        >
          {t.downloadJSON}
        </Button>

        <Button
          className='text-btn'
          onClick={handleSendToServer}
          disabled={allChecked !== 'OK' || !heartBeatStatus}
          errorMessage={heartBeatStatus ? undefined : t.errorServerOffline}
        >
          {t.sendToServer}
        </Button>
      </div>

      <CellDefResult
        status={optimizationStatus}
        result={optimizationResult}
        ganttBase64={optimizationGantt}
      />
    </div>
  )
}
