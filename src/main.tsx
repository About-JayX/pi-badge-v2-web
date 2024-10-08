import '@/style/global.scss'
import '@/i18n'
import 'virtual:svg-icons-register'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import store from './store'
import { Buffer } from 'buffer'

window.Buffer = Buffer
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
