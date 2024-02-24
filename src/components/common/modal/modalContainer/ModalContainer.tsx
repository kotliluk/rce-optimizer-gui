// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

import './ModalContainer.scss'
import { selectModalWindowType } from '../../../../redux/page/selector'
import { useCloseModal } from '../../../../logic/hooks/useCloseModal'


export const ModalContainer = (): JSX.Element | null => {
  const [root] = useState<Element>(document.getElementById('modal-root') as Element)

  const modalType = useSelector(selectModalWindowType)
  const closeModal = useCloseModal()

  const close = useCallback((e: KeyboardEvent) => {
    e.code === 'Escape' && closeModal()
  }, [closeModal])

  useEffect(() => {
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [close])

  if (modalType === 'NONE') {
    return null
  }

  return ReactDOM.createPortal((
    <div className='modal-container' />
  ), root)
}
