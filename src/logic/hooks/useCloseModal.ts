import { useCallback } from 'react'

import { useDispatch } from '../../redux/useDispatch'
import { setModalWindow } from '../../redux/page/actions'


export const useCloseModal = (): (() => void) => {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(setModalWindow('NONE')), [])
}
