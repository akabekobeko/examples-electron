import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { reducer as RootReducer } from './reducers'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Theme } from './Theme'
import {
  handleUpdateMessage,
  handleUpdateWindowIds,
  getWindowIds
} from './actions/'
import { Container as App } from './containers/App'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${Theme.colors.text};
    font-family: system-ui, sans-serif;
    background-color: ${Theme.colors.white};
  }

  .app {
    width: 100%;
    height: 100%;
  }

  @font-face {
    font-family: 'icon';
    src: url('fonts/icon.eot?wb6ufj');
    src: url('fonts/icon.eot?wb6ufj#iefix') format('embedded-opentype'),
      url('fonts/icon.ttf?wb6ufj') format('truetype'),
      url('fonts/icon.woff?wb6ufj') format('woff'),
      url('fonts/icon.svg?wb6ufj#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(reduxThunk))

  store.dispatch(handleUpdateMessage() as any)
  store.dispatch(handleUpdateWindowIds() as any)
  store.dispatch(getWindowIds() as any)

  render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    document.querySelector('.app')
  )
})
