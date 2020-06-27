import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import './App.scss'
import { reducer as RootReducer } from './reducers/index'
import { Container as Explorer } from './containers/Explorer'
import { Container as Toolbar } from './containers/Toolbar'
import { Container as FileItemList } from './containers/FileItemList'
import SplitPane from 'react-split-pane'

window.addEventListener('load', () => {
  let store = createStore(RootReducer, applyMiddleware(ReduxThunkMiddleware))

  render(
    <Provider store={store}>
      <>
        <Toolbar />
        <div className="content">
          <SplitPane split="vertical" minSize={256} defaultSize={256}>
            <Explorer />
            <FileItemList />
          </SplitPane>
        </div>
      </>
    </Provider>,
    document.querySelector('.app')
  )
})
