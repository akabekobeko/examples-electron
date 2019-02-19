import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import RootReducer from './reducers/index'
import App from './containers/App'

declare global {
  interface Window {
    require: any
  }
}

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(ReduxThunkMiddleware))

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app')
  )
})
