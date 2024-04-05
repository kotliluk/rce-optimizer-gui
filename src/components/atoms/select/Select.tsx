// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './Select.scss'
import { ErrorMsg } from '../errorMsg/ErrorMsg'


export interface SelectValue {
  value: string
  text: string
}

interface SelectProps {
  selected: string
  values: SelectValue[]
  onChange: (value: string) => void
  id?: string
  className?: string
  invalid?: boolean
  errorMessage?: string
}

export const Select = (props: SelectProps): JSX.Element => {
  const { selected, values, onChange, id, className, invalid, errorMessage } = props

  return (
    <div className={`__select-wrapper ${invalid ? 'invalid' : ''}`}>
      <select
        id={id}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className={`__select ${className}`}
      >
        {values.map(v => <option key={v.value} value={v.value}>{v.text}</option>)}
      </select>
      <ErrorMsg errorMessage={errorMessage} />
    </div>
  )
}
