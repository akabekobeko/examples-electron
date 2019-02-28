import './App.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import RootReducer from './reducers'
import {
  handleUpdateMessage,
  handleUpdateWindowIds,
  getWindowIds
} from './actions/'
import App from './containers/App'

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(ReduxThunkMiddleware))

  store.dispatch(handleUpdateMessage() as any)
  store.dispatch(handleUpdateWindowIds() as any)
  store.dispatch(getWindowIds() as any)

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app')
  )
})
