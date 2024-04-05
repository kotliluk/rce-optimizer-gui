// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './Select.scss'


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
}

export const Select = (props: SelectProps): JSX.Element => {
  const { selected, values, onChange, id, className } = props

  return (
    <select
      id={id}
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={`__select ${className}`}
    >
      {values.map(v => <option key={v.value} value={v.value}>{v.text}</option>)}
    </select>
  )
}
