import { Context } from 'material-flux'
import Util from '../common/Util.js'
import MainWindowStore from './store/MainWindowStore.js'
import MainWindowAction from './action/MainWindowAction.js'

/**
 * Application context.
 */
export default class AppContext extends Context {
  /**
   * Initialize instance.
   */
  constructor () {
    super()

    if (DEBUG) {
      Util.log('Initialize AppContext')
    }

    /**
     * The unique window identifier from the main process.
     * @type {Number}
     */
    this.windowID = window.location.hash

    if (this.windowID) {
      this.windowID = Number(this.windowID.replace('#', ''))
    }

    document.title += ' [ ' + this.windowID + ' ]'

    /**
     * IPC module for renderer process.
     * @type {ipcRenderer}
     */
    this.ipc = window.require('electron').ipcRenderer

    /**
     * Main window store.
     * @type {MainWindowStore}
     */
    this.mainWindowStore = new MainWindowStore(this)

    /**
     * Main window actions.
     * @type {MainWindowAction}
     */
    this.mainWindowAction = new MainWindowAction(this)
  }
}
