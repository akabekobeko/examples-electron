import './App.scss'
import AppContainer from './view/AppContainer.js'
import AppContext from './AppContext.js'

// Compile switch
global.DEBUG = true

window.onload = () => {
  const context = new AppContext()
  AppContainer.setup(context)
}
