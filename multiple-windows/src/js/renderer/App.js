import './App.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import RootReducer from './reducers'
import { onUpdateMessage, onUpdateWindowIDs, getWindowIDs } from './actions/'
import App from './containers/App.js'

window.addEventListener('load', () => {
  // Compile switch
  global.DEBUG = true

  let store = createStore(
    RootReducer,
    applyMiddleware(
      ReduxThunkMiddleware
    )
  )

  store.dispatch(onUpdateMessage())
  store.dispatch(onUpdateWindowIDs())
  store.dispatch(getWindowIDs())

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app')
  )
})
