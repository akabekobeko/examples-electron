import React                  from 'react';
import ReactDOM               from 'react-dom';
import { Context }            from 'material-flux';
import Util                   from '../../common/Util.js';
import EffectGraphicEqualizer from './view/EffectGraphicEqualizer.js';

/**
 * Context of the graphic equalizer window.
 */
export default class EffectGraphicEqualizerContext extends Context {
  /**
   * Initialize instance.
   *
   * @type {Element} elm Element of the rendering target.
   */
  constructor( elm ) {
    super();

    if( DEBUG ) {
      Util.log( 'Initialize EffectGraphicEqualizerContext' );
    }

    // Setup window
    ReactDOM.render( <EffectGraphicEqualizer context={ this } />, elm );
  }
}
