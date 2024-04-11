import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import './styles/global.scss'
import { store } from './redux/store'
import App from './App'
import { ModalContainer } from './components/common/modal/modalContainer/ModalContainer'
import { client } from './apollo/client'


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          <ModalContainer />
        </BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
