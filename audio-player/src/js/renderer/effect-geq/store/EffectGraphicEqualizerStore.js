import { Store } from 'material-flux';
import { Keys }  from '../action/EffectGraphicEqualizerAction.js';

/**
 * Manage for audio player.
 */
export default class EffectGraphicEqualizerStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {EffectGraphicEqualizerContext} context Contect of the graphic equalizer.
   */
  constructor( context ) {
    super( context );

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      connect: false,
      gains: []
    };

    this.register( Keys.connect, this._actionConnect );
    this.register( Keys.update, this._actionUpdate );
  }

  /**
   * Update the gains.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  _actionConnect( connect ) {
    this.setState( { connect: connect } );
  }

  /**
   * Update the gains.
   *
   * @param {Array.<Number>} gains Gains of the graphic equalizer.
   */
  _actionUpdate( gains ) {
    this.setState( { gains: gains } );
  }
}
