// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { Link } from 'react-router-dom'

import './MainPage.scss'
import { useSelector } from '../../redux/useSelector'
import { selectTranslation } from '../../redux/page/selector'


export const MainPage = (): JSX.Element => {
  const { mainPage: t } = useSelector(selectTranslation)

  return (
    <main className='main-page'>
      <h1>{t.title}</h1>

      <div className='feature-card'>
        <p className='feature-text'>{t.cellDefinition.annotation}</p>
        <Link className='feature-link' to='/cell-definition'>{t.cellDefinition.link}</Link>
      </div>
    </main>
  )
}
