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

/**
 * The optimization result with a formatted table and a Gantt chart.
 */
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
        <table className='result-table'>
          <tbody>
            {resultObj.robots.map((r) => (
              <React.Fragment key={r.id}>
                <tr className='robot-tr'>
                  <th>{t.tableActivityColumn} {r.id}</th>
                  <th>{t.tableDurationColumn}</th>
                  <th>{t.tableStartTimeColumn}</th>
                  <th>{t.tableEndTimeColumn}</th>
                </tr>
                {r.activities.map((a) => (
                  <tr key={a.id} className='activity-tr'>
                    <td><span className={`type-circle ${a.type}`} />{a.id}</td>
                    <td>{a.duration}</td>
                    <td>{a.start_time}</td>
                    <td>{a.end_time}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      {ganttBase64 && (
        <img
          className='gantt-chart'
          alt="Gantt Chart"
          src={`data:image/jpeg;base64,${ganttBase64}`}
        />
      )}
    </div>
  )
}
