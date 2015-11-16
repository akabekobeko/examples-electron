import { Store }                 from 'material-flux';
import { Keys }                  from '../action/EffectGraphicEqualizerAction.js';
import { IPCKeys }               from '../../../common/Constants.js';
import { StorageKeys }           from '../../../common/Constants.js';
import { GraphicEqulizerParams } from '../../../common/Constants.js';

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
      gains: [],
      presetNumber: 0,
      presets: [
        { name: 'Normal',   gains: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] },
        { name: 'Loudness', gains: [ 20, 10, 0, 0, 0, 0, 0, 0, -10, -10 ] }
      ]
    };

    this.register( Keys.connect, this._actionConnect );
    this.register( Keys.update, this._actionUpdate );

    this._load();
  }

  /**
   * Get the status of effector connection.
   *
   * @return {Boolean} "true" if is connected.
   */
  get connect() {
    return this.state.connect;
  }

  /**
   * Get the gains of graphic equalizer.
   *
   * @return {Array.<Number>} Gains.
   */
  get gains() {
    return this.state.gains;
  }

  /**
   * Get the index number of presets.
   *
   * @return {NUmber} Index number.
   */
  get presetNumber() {
    return this.state.presetNumber;
  }

  /**
   * Get the preset gains of graphic equalizer.
   *
   * @return {Array.<GraphicEqualizerPreset>} Presets.
   */
  get presets() {
    return this.state.presets;
  }

  /**
   * Update the connection status of the effector.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  _actionConnect( connect ) {
    this.setState( { connect: connect } );
    this._save();
  }

  /**
   * Update the gains.
   *
   * @param {Number} index Index of the gains.
   * @param {Number} value New value.
   */
  _actionUpdate( index, value ) {
    const gains = this.state.gains.concat();
    gains[ index ] = value;
    this.setState( { gains: gains } );
    this._save();
  }

  /**
   * Load the parameters of the graphic equalizer.
   */
  _load() {
    const params = this.context.localStorage.getItem( StorageKeys.GraphicEqulizerParams, true );
    if( params ) {
      this.setState( {
        connect: params.connect,
        gains:   params.gains,
        preset:  ( params.preset === undefined ? 0 : params.preset )
      } );
    } else {
      const gains = [];
      for( let i = 0; i < GraphicEqulizerParams.Bands; ++i ) {
        gains.push( 0 );
      }

      this.setState( { gains: gains } );
    }

    this._notifyUpdate();
  }

  /**
   * Save the parameters of the graphic equalizer.
   */
  _save() {
    const params = {
      connect: this.state.connect,
      gains: this.state.gains,
      preset: 0
    };

    this.context.localStorage.setItem( StorageKeys.GraphicEqulizerParams, params, true );
    this._notifyUpdate();
  }

  /**
   * That the graphic equalizer has been updated it will notify the audio player.
   */
  _notifyUpdate() {
    this.context.ipc.send( IPCKeys.RequestUpdateGraphicEqualizer, this.state.connect, this.state.gains );
  }
}
