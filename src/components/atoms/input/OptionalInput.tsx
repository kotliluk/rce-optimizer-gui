// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './Input.scss'
import { CheckBox } from '../checkBox/CheckBox'
import { Input } from './Input'


interface OptionalInputProps {
  label?: string
  type: 'text' | 'number'
  value: string | number | undefined
  onChange: (value: string | undefined) => void
  defaultDefinedValue: string
  className?: string
  min?: number
  max?: number
  invalid?: boolean
  errorMessage?: string
}

export const OptionalInput = (props: OptionalInputProps): JSX.Element => {
  const { label, value, className, onChange, defaultDefinedValue, ...other } = props

  return (
    <div className={`${className} optional-input`}>
      {label && (<span className='optional-input-label'>{label}</span>)}
      <CheckBox
        checked={value !== undefined}
        onChange={checked => onChange(checked ? defaultDefinedValue : undefined)}
      />
      <Input
        value={value !== undefined ? value : ''}
        onChange={onChange}
        disabled={value === undefined}
        {...other}
      />
    </div>
  )
}
