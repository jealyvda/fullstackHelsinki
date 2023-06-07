import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import App from './App'
// import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<Provider store={store}>
    <Router>
      <App />
    </Router>
 //</Provider>
)