import { Action } from 'material-flux';

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  connect: 'EffectGraphicEqualizerAction.connect',
  update: 'EffectGraphicEqualizerAction.update'
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
  update( index, value ) {
    this.dispatch( Keys.update, index, value );
  }
}
