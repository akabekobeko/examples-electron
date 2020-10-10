import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import { reducer as RootReducer } from './reducers/index'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Theme } from './Theme'
import { Container as Explorer } from './containers/Explorer'
import { Container as Toolbar } from './containers/Toolbar'
import { Container as FileItemList } from './containers/FileItemList'
import SplitPane from 'react-split-pane'

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

  .disable {
    color: ${Theme.colors.gray};
  }

  .Resizer {
    background: ${Theme.colors.black};
    opacity: 0.2;
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;

    &:hover {
      transition: all 2s ease;
    }

    &.horizontal {
      height: 11px;
      margin: -5px 0;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      cursor: row-resize;
      width: 100%;
    }

    &.horizontal:hover {
      border-top: 5px solid rgba(0, 0, 0, 0.5);
      border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    &.vertical {
      width: 11px;
      margin: 0 -5px;
      border-left: 5px solid rgba(255, 255, 255, 0);
      border-right: 5px solid rgba(255, 255, 255, 0);
      cursor: col-resize;
      height: 100%;
    }

    &.vertical:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
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

const StyledContent = styled.div`
  position: absolute;
  top: 2rem;
  bottom: 0;
  width: 100%;
`

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(ReduxThunkMiddleware))

  render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Toolbar />
        <StyledContent>
          <SplitPane split="vertical" minSize={256} defaultSize={256}>
            <Explorer />
            <FileItemList />
          </SplitPane>
        </StyledContent>
      </ThemeProvider>
    </Provider>,
    document.querySelector('.app')
  )
})
