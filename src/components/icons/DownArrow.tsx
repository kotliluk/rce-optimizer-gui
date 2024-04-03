// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import { ReactComponent } from '../../assets/svg/down-arrow.svg'
import { IconPropsWithFill } from './iconProps'


export const DownArrow = (props: IconPropsWithFill): JSX.Element => {
  return <ReactComponent {...props} />
}
