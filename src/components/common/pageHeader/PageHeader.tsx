// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { Link } from 'react-router-dom'

import './PageHeader.scss'
import { SettingsMenu } from '../settingsMenu/SettingsMenu'


export const PageHeader = (): JSX.Element => {
  return (
    <header className='page-header'>
      <Link to={'/'} className='home-link'>
        {/* <AppIcon className='logo' /> */}
        RCE Optimizer
      </Link>

      <SettingsMenu />
    </header>
  )
}
