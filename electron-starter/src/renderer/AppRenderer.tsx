import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import './App.scss'
import { reducer as RootReducer } from './reducers'
import { Container as BasicFunction } from './containers/BasicFunction'
import { Container as DialogForm } from './containers/DialogForm'

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(reduxThunk))

  render(
    <Provider store={store}>
      <>
        <BasicFunction />
        <DialogForm />
      </>
    </Provider>,
    document.querySelector('.app')
  )
})
