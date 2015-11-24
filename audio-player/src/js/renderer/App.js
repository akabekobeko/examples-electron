import MainWindowContext             from './main/MainWindowContext.js';
import EffectGraphicEqualizerContext from './effect-geq/EffectGraphicEqualizerContext.js';

// Compile switch
global.DEBUG = true;

let context = null;

window.onload = () => {
  const elm = document.querySelector( '.app' );
  if( !( elm ) ) { return; }

  switch( elm.dataset.mode ) {
    case 'effect-graphic-equalizer':
      context = new EffectGraphicEqualizerContext( elm );
      break;

    default:
      context = new MainWindowContext( elm );
      break;
  }
};
