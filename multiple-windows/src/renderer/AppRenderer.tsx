import './App.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { reducer as RootReducer } from './reducers'
import {
  handleUpdateMessage,
  handleUpdateWindowIds,
  getWindowIds
} from './actions/'
import { Container as App } from './containers/App'

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(reduxThunk))

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
