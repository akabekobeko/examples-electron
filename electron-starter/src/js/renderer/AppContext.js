import { Context }  from 'material-flux'
import Util from '../common/Util.js'
import SampleStore from './store/SampleStore.js'
import SampleAction from './action/SampleAction.js'

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
     * IPC module for renderer process.
     * @type {ipcRenderer}
     */
    this.ipc = window.require('electron').ipcRenderer

    /**
     * Sample store.
     * @type {SampleStore}
     */
    this.sampleStore = new SampleStore(this)

    /**
     * Sample actions.
     * @type {SampleAction}
     */
    this.sampleAction = new SampleAction(this)
  }
}
