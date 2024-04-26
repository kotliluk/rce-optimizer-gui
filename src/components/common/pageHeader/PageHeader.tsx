// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { Link } from 'react-router-dom'

import './PageHeader.scss'
import { SettingsMenu } from '../settingsMenu/SettingsMenu'


/**
 * Page header with the Home link and settings menu.
 */
export const PageHeader = (): JSX.Element => {
  return (
    <header className='page-header'>
      <Link to={'/'} className='home-link'>
        RCE Optimizer
      </Link>

      <SettingsMenu />
    </header>
  )
}
