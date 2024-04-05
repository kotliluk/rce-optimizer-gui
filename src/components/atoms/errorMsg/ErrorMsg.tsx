// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './ErrorMsg.scss'


interface ErrorMsgProps {
  errorMessage?: string
}

export const ErrorMsg = (props: ErrorMsgProps): JSX.Element | null => {
  const { errorMessage } = props

  return errorMessage ? <span className='__error-msg'>{errorMessage}</span> : null
}
