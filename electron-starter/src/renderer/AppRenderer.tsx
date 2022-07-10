import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from '@mui/material'
import { Theme } from './Theme'
import { reducer as RootReducer } from './reducers'
import { Container as BasicFunction } from './containers/BasicFunction'
import { Container as DialogForm } from './containers/DialogForm'

window.addEventListener('load', () => {
  let store = configureStore({ reducer: RootReducer })
  const container = document.querySelector('.app')
  const root = createRoot(container!)
  root.render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <BasicFunction />
        <DialogForm />
      </ThemeProvider>
    </Provider>
  )
})
