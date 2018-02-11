import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import AppContextMain from './main/AppContext.js'
import AppContainerMain from './main/view/AppContainer.js'
import AppContextEffectGraphicEqualizer from './effect-geq/AppContext.js'
import AppContainerEffectGraphicEqualizer from './effect-geq/view/AppContainer.js'

// Compile switch
global.DEBUG = true

window.onload = () => {
  const elm = document.querySelector('.app')
  if (!(elm)) { return }

  let context = null
  switch (elm.dataset.mode) {
    case 'effect-graphic-equalizer':
      context = new AppContextEffectGraphicEqualizer(elm)
      ReactDOM.render(<AppContainerEffectGraphicEqualizer context={context} />, elm)
      break

    default:
      context = new AppContextMain(elm)
      ReactDOM.render(<AppContainerMain context={context} />, elm)
      break
  }

  if (DEBUG && context) {
    console.log('Renderer is initialized.')
  }
}
