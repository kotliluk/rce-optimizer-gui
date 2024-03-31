// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import './CellDefPage.scss'
import { useSelector } from '../../redux/useSelector'
import { selectTranslation } from '../../redux/page/selector'
import { CellInfoForm } from '../../components/cellDefPage/cellInfoForm/CellInfoForm'
import { RobotsForm } from '../../components/cellDefPage/robotForm/RobotsForm'


export const CellDefPage = (): JSX.Element => {
  const { cellDefPage: t } = useSelector(selectTranslation)

  return (
    <main className='cell-def-page'>
      <h1>{t.title}</h1>
      <CellInfoForm />
      <RobotsForm />
    </main>
  )
}
