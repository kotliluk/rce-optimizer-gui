// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { ReactNode } from 'react'

import './Button.scss'
import { ErrorMsg } from '../errorMsg/ErrorMsg'


interface ButtonProps {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children?: ReactNode
  invalid?: boolean
  errorMessage?: string
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { className, children, invalid, errorMessage, ...other } = props

  return (
    <div className={`__button-wrapper ${invalid ? 'invalid' : ''}`}>
      <button className={`__button ${className ?? ''}`} {...other}>
        {children}
      </button>
      <ErrorMsg errorMessage={errorMessage} />
    </div>
  )
}
