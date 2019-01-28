import '../App.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunkMiddleware from 'redux-thunk'
import RootReducer from '../reducers/index'
import Toolbar from '../components/Toolbar'

const App: React.SFC = () => (
  <div>
    <Toolbar />
  </div>
)

const RenderApp = () => {
  let store = createStore(
    RootReducer,
    applyMiddleware(
      ReduxThunkMiddleware
    )
  )

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.app')
  )
}

export default RenderApp

/*
interface AppProps {
  name?: string
}

const App: React.SFC<AppProps> = ({ name }) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to {name}</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  );
};

App.defaultProps = {
  name: 'React.SFC',
};

export default App;
*/
