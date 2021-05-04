import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import SplitPane from './main/components/react-split-pane/'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Theme } from './Theme'
import { reducer as ReducerGEQ } from './effect-eq/reducers/reducer'
import { Container as ContainerGEQ } from './effect-eq/containers/App'
import { reducer as ReducerMain } from './main/reducers/reducer'
import { Container as ContainerPlayer } from './main/containers/Player'
import { Container as ContainerArtistList } from './main/containers/ArtistList'
import { Container as ContainerAlbumList } from './main/containers/AlbumList'
import { loadMusicList } from './main/actions'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.text};
    font-family: system-ui, sans-serif;
  }

  .app {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.white};
  }

  .page {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .content {
    position: absolute;
    top: ${(props) => props.theme.layout.playerHeight};
    bottom: 0;
    width: 100%;
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

  .Resizer {
    background: ${(props) => props.theme.colors.black};
    opacity: 0.2;
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;
  }

  .Resizer:hover {
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
    height: 100%;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
`

/**
 * Render the graphic equalizer window.
 * @param element Root element of application.
 */
const renderGEQ = (element: Element) => {
  let store = createStore(ReducerGEQ, applyMiddleware(ReduxThunkMiddleware))
  render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <ContainerGEQ />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>,
    element
  )
}

/**
 * Render the main application window.
 * @param element Root element of application.
 */
const renderMain = (element: Element) => {
  let store = createStore(ReducerMain, applyMiddleware(ReduxThunkMiddleware))

  store.dispatch(loadMusicList() as any)

  render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <div className="page">
          <ContainerPlayer />
          <div className="content">
            <SplitPane split="vertical" minSize={256} defaultSize={256}>
              <ContainerArtistList />
              <ContainerAlbumList />
            </SplitPane>
          </div>
        </div>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>,
    element
  )
}

window.addEventListener('load', () => {
  const element = document.querySelector('.app') as HTMLElement
  if (!element) {
    return
  }

  switch (element.dataset['mode']) {
    case 'effect-graphic-equalizer':
      renderGEQ(element)
      break

    default:
      renderMain(element)
      break
  }
})
