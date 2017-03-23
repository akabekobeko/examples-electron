import { Store } from 'material-flux'
import { Keys } from '../action/MainWindowAction.js'
import { IPCKeys } from '../../common/Constants.js'
import Util from '../../common/Util.js'

/**
 * Main window store.
 */
export default class MainWindowStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {AppContext} context Application context.
   */
  constructor (context) {
    super(context)

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      message: null,
      windowIDs: []
    }

    this.register(Keys.createNewWindow, this._actionCreateNewWindow)
    this.register(Keys.sendMessage, this._actionSendMessage)

    context.ipc.on(IPCKeys.FinishCreateNewWindow, this._onFinishCreateNewWindow.bind(this))
    context.ipc.on(IPCKeys.FinishSendMessage, this._onFinishSendMessage.bind(this))
    context.ipc.on(IPCKeys.FinishGetWindowIDs, this._onFinishGetWindowIDs.bind(this))
    context.ipc.on(IPCKeys.UpdateWindowIDs, this._onUpdateWindowIDs.bind(this))
    context.ipc.on(IPCKeys.UpdateMessage, this._onUpdateMessage.bind(this))

    context.ipc.send(IPCKeys.RequestGetWindowIDs)
  }

  /**
   * Get a message from other window..
   *
   * @return {String} Message.
   */
  get message () {
    return this.state.message
  }

  /**
   * Get an other window's identifiers.
   *
   * @return {Array.<String>} Identifiers.
   */
  get windowIDs () {
    return this.state.windowIDs
  }

  /**
   * Create a new window.
   */
  _actionCreateNewWindow () {
    this.context.ipc.send(IPCKeys.RequestCreateNewWindow)
  }

  /**
   * Send a message to the other window.
   *
   * @param {Number} id      Identifier of a target window.
   * @param {String} message Message string.
   */
  _actionSendMessage (id, message) {
    this.context.ipc.send(IPCKeys.RequestSendMessage, id, message)
  }

  /**
   * Occurs when the window create request has been finished.
   */
  _onFinishCreateNewWindow () {
    if (DEBUG) { Util.log('_onFinishCreateNewWindow') }
  }

  /**
   * Occurs when the message sent has been finished..
   */
  _onFinishSendMessage () {
    if (DEBUG) { Util.log('_onFinishSendMessage') }
  }

  /**
   * Occurs when the window show request has been finished.
   *
   * @param {IPCEvent}       ev        Event data.
   * @param {Array.<Number>} windowIDs Window's identifiers.
   */
  _onFinishGetWindowIDs (ev, windowIDs) {
    if (DEBUG) {
      Util.log('_onFinishGetWindowIDs')
    }

    this.setState({ windowIDs: windowIDs.filter((id) => id !== this.context.windowID) })
  }

  /**
   * Occurs when the ID get request of the window has been finished.
   *
   * @param {IPCEvent}       ev        Event data.
   * @param {Array.<Number>} windowIDs Window's identifiers.
   */
  _onUpdateWindowIDs (ev, windowIDs) {
    this.setState({ windowIDs: windowIDs.filter((id) => id !== this.context.windowID) })
  }

  /**
   * Occurs when the window's identifiers has been updated.
   *
   * @param {IPCEvent} ev      Event data.
   * @param {String}   message Message.
   */
  _onUpdateMessage (ev, message) {
    this.setState({ message: message })
  }
}
