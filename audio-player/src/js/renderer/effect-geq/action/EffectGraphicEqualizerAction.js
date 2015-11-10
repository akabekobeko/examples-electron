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
   * Update the gains.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  connect( connect ) {
    this.dispatch( Keys.connect, connect );
  }

  /**
   * Update the gains.
   *
   * @param {Array.<Number>} gains Gains of the graphic equalizer.
   */
  update( connect, gains ) {
    this.dispatch( Keys.update, gains );
  }
}
