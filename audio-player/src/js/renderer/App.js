import MainWindowContext from './main/MainWindowContext.js'
import EffectGraphicEqualizerContext from './effect-geq/EffectGraphicEqualizerContext.js'

// Compile switch
global.DEBUG = true

window.onload = () => {
  const elm = document.querySelector('.app')
  if (!(elm)) { return }

  let context = null
  switch (elm.dataset.mode) {
    case 'effect-graphic-equalizer':
      context = new EffectGraphicEqualizerContext(elm)
      break

    default:
      context = new MainWindowContext(elm)
      break
  }

  if (DEBUG && context) {
    console.log('Renderer is initialized.')
  }
}
