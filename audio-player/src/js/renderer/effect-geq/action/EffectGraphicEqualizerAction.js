import { Action } from 'material-flux'

/**
 * Define keys for action.
 * @type {object}
 */
export const Keys = {
  connect: 'EffectGraphicEqualizerAction.connect',
  updateGain: 'EffectGraphicEqualizerAction.updateGain',
  selectPreset: 'EffectGraphicEqualizerAction.selectPreset'
}

/**
 * Graphic equalizer actions.
 */
export default class EffectGraphicEqualizerAction extends Action {
  /**
   * Update the connection status of the effector.
   *
   * @param {boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  connect (connect) {
    this.dispatch(Keys.connect, connect)
  }

  /**
   * Update the gains.
   *
   * @param {number} index Index of the gains.
   * @param {number} value New value.
   */
  updateGain (index, value) {
    this.dispatch(Keys.updateGain, index, value)
  }

  /**
   * Select the preset.
   *
   * @param {number} presetNumber Number of the new prest.
   */
  selectPreset (presetNumber) {
    this.dispatch(Keys.selectPreset, presetNumber)
  }
}
