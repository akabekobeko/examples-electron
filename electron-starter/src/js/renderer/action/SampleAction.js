import { Action } from 'material-flux';

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  updateDatetime:   'SampleAction.updateDatetime'
};

/**
 * Sample actions.
 */
export default class SampleAction extends Action {
  /**
   * Update datetime.
   */
  updateDatetime() {
    this.dispatch( Keys.updateDatetime );
  }
}
