// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { PageHeader } from './components/common/pageHeader/PageHeader'
import { MainPage } from './pages/main/MainPage'
import { useSelector } from './redux/useSelector'
import { selectTheme } from './redux/page/selector'
import { CellDefPage } from './pages/cellDef/CellDefPage'


const App = (): JSX.Element => {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.body.className = `theme--${theme}`
  })

  return (
    <div className='app with-scrollbar'>
      <PageHeader />
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/cell-definition'>
          <CellDefPage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  )
}

export default App
