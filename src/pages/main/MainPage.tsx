// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './MainPage.scss'
import { useSelector } from '../../redux/useSelector'
import { selectTranslation } from '../../redux/page/selector'


export const MainPage = (): JSX.Element => {
  const { mainPage: t } = useSelector(selectTranslation)

  return (
    <main className='main-page'>
      <h1>RCE Optimizer</h1>
    </main>
  )
}
