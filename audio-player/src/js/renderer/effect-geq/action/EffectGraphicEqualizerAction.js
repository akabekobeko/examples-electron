import { Action } from 'material-flux';

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  connect:      'EffectGraphicEqualizerAction.connect',
  updateGain:   'EffectGraphicEqualizerAction.updateGain',
  selectPreset: 'EffectGraphicEqualizerAction.selectPreset'
};

/**
 * Graphic equalizer actions.
 */
export default class EffectGraphicEqualizerAction extends Action {
  /**
   * Update the connection status of the effector.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  connect( connect ) {
    this.dispatch( Keys.connect, connect );
  }

  /**
   * Update the gains.
   *
   * @param {Number} index Index of the gains.
   * @param {Number} value New value.
   */
  updateGain( index, value ) {
    this.dispatch( Keys.updateGain, index, value );
  }

  /**
   * Select the preset.
   *
   * @param {Number} presetNumber Number of the new prest.
   */
  selectPreset( presetNumber ) {
    this.dispatch( Keys.selectPreset, presetNumber );
  }
}
