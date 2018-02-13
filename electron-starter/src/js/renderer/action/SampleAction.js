import { Action } from 'material-flux'

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  updateDatetime: 'SampleAction.updateDatetime',
  showURL: 'SampleAction.showURL'
}

/**
 * Sample actions.
 */
export default class SampleAction extends Action {
  /**
   * Update datetime.
   */
  updateDatetime () {
    this.dispatch(Keys.updateDatetime)
  }

  /**
   * Show a URL in an external web browser.
   *
   * @param {String} url URL.
   */
  showURL (url) {
    this.dispatch(Keys.showURL, url)
  }
}
