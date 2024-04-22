// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useEffect, useState } from 'react'

import './CellDefControl.scss'
import { useSelector } from '../../../redux/useSelector'
import { selectTranslation } from '../../../redux/page/selector'
import { ResultJSON } from '../../../types/cellDefJson'


interface GanttChartProps {
  status: string | null
  result: string | null
  ganttBase64: string | null
}

export const CellDefResult = (props: GanttChartProps): JSX.Element | null => {
  const { status, result, ganttBase64 } = props
  const { cellDefPage: { cellDefControl: t } } = useSelector(selectTranslation)

  const [resultObj, setResultObj] = useState<ResultJSON | null>(null)

  useEffect(() => {
    setResultObj(result === null ? null : JSON.parse(result))
  }, [result, setResultObj])

  return (
    <div className='cell-def-result'>
      {status === 'OK' && (
        <p className="bold">{t.optimizationOK}</p>
      )}
      {status !== null && status !== 'OK' && (
        <p><span className="bold">{t.optimizationError}</span>: {status}</p>
      )}
      {resultObj && (
        <p>TODO - parse a table</p>
      )}
      {ganttBase64 && (
        <>
          <p className="bold">{t.ganttChart}</p>
          <img
            className='gantt-chart'
            alt="Gantt Chart"
            src={`data:image/jpeg;base64,${ganttBase64}`}
          />
        </>
      )}
    </div>
  )
}
