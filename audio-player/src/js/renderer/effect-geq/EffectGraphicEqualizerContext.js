import React                        from 'react';
import ReactDOM                     from 'react-dom';
import { Context }                  from 'material-flux';
import Util                         from '../../common/Util.js';
import LocalStorage                 from '../common/LocalStorage.js';
import EffectGraphicEqualizerStore  from './store/EffectGraphicEqualizerStore.js';
import EffectGraphicEqualizerAction from './action/EffectGraphicEqualizerAction.js';
import EffectGraphicEqualizer       from './view/EffectGraphicEqualizer.js';

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

    /**
     * Provides a inter-process communication.
     * @type {IPC}
     */
    this.ipc = window.require( 'ipc' );

    /**
     * Provides a localStorage ( Web Storage ) of operating functions.
     * @type {LocalStorage}
     */
    this.localStorage = new LocalStorage();

    /**
     * Store of the graphic equalize.
     * @type {EffectGraphicEqualizerStore}
     */
    this.effectGraphicEqualizerStore = new EffectGraphicEqualizerStore( this );

    /**
     * Action of the graphic equalize.
     * @type {EffectGraphicEqualizerAction}
     */
    this.effectGraphicEqualizerAction = new EffectGraphicEqualizerAction( this );

    // Setup window
    ReactDOM.render( <EffectGraphicEqualizer context={ this } />, elm );
  }
}
