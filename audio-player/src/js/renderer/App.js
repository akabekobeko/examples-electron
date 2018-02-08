import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import MainWindowContext from './main/MainWindowContext.js'
import MainWindow from './main/view/MainWindow.js'
import EffectGraphicEqualizerContext from './effect-geq/EffectGraphicEqualizerContext.js'
import EffectGraphicEqualizer from './effect-geq/view/Effector.js'

// Compile switch
global.DEBUG = true

window.onload = () => {
  const elm = document.querySelector('.app')
  if (!(elm)) { return }

  let context = null
  switch (elm.dataset.mode) {
    case 'effect-graphic-equalizer':
      context = new EffectGraphicEqualizerContext(elm)
      ReactDOM.render(<EffectGraphicEqualizer context={context} />, elm)
      break

    default:
      context = new MainWindowContext(elm)
      ReactDOM.render(<MainWindow context={context} />, elm)
      break
  }

  if (DEBUG && context) {
    console.log('Renderer is initialized.')
  }
}
