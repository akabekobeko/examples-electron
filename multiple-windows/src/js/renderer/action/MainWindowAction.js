import { Action } from 'material-flux'

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  createNewWindow: 'MainWindowAction.createNewWindow',
  sendMessage: 'MainWindowAction.sendMessage'
}

/**
 * Main window actions.
 */
export default class MainWindowAction extends Action {
  /**
   * Create a new window.
   */
  createNewWindow () {
    this.dispatch(Keys.createNewWindow)
  }

  /**
   * Send a message to the other window.
   *
   * @param {Number} id      Identifier of a target window.
   * @param {String} message Message string.
   */
  sendMessage (id, message) {
    this.dispatch(Keys.sendMessage, id, message)
  }
}
