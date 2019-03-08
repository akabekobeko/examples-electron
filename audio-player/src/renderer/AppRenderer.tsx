import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import './App.scss'
import RootReducerGEQ from './effect-eq/reducers/reducer'
import AppContainerGEQ from './effect-eq/containers/App'

/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    require: any
  }
}

const renderGEQ = () => {
  let store = createStore(RootReducerGEQ, applyMiddleware(ReduxThunkMiddleware))
  render(
    <Provider store={store}>
      <>
        <AppContainerGEQ />
      </>
    </Provider>,
    document.querySelector('.app')
  )
}

window.addEventListener('load', () => {
  renderGEQ()
})
