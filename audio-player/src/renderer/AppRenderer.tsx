import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import SplitPane from 'react-split-pane'
import './App.scss'
import ReducerGEQ from './effect-eq/reducers/reducer'
import ContainerGEQ from './effect-eq/containers/App'
import ReducerMain from './main/reducers/reducer'
import ContainerPlayer from './main/containers/Player'
import ContainerArtistList from './main/containers/ArtistList'
import ContainerAlbumList from './main/containers/AlbumList'
import { loadMusicList } from './main/actions'

/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    require: any
  }
}

/**
 * Render the graphic equalizer window.
 * @param element Root element of application.
 */
const renderGEQ = (element: Element) => {
  let store = createStore(ReducerGEQ, applyMiddleware(ReduxThunkMiddleware))
  render(
    <Provider store={store}>
      <ContainerGEQ />
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
      <div className="page">
        <ContainerPlayer />
        <div className="content">
          <SplitPane split="vertical" minSize={256} defaultSize={256}>
            <ContainerArtistList />
            <ContainerAlbumList />
          </SplitPane>
        </div>
      </div>
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
