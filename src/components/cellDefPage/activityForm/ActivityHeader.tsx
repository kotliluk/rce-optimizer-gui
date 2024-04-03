// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'

import { Button } from '../../atoms/button/Button'
import { DownArrow } from '../../icons/DownArrow'
import { Cross } from '../../icons/Cross'


interface ActivityHeaderProps {
  bodyOpened: boolean
  openedTitle: string
  closedTitle: string
  onDelete?: () => void
  setBodyOpened: (updater: (opened: boolean) => boolean) => void
}

export const ActivityHeader = (props: ActivityHeaderProps): JSX.Element => {
  const { bodyOpened, openedTitle, closedTitle, onDelete, setBodyOpened } = props

  return (
    <div className='activity-form-header'>
      <span className='activity-form-title'>{bodyOpened ? openedTitle : closedTitle}</span>
      {onDelete && (
        <Button className='delete-btn' onClick={() => onDelete()}>
          <Cross />
        </Button>
      )}
      <Button className='toggle-btn' onClick={() => setBodyOpened(v => !v)}>
        <DownArrow className={`${bodyOpened ? 'up' : 'down'}`} />
      </Button>
    </div>
  )
}
