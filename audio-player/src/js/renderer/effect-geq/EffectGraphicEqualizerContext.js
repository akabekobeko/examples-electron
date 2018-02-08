import { Context } from 'material-flux'
import LocalStorage from '../LocalStorage.js'
import EffectGraphicEqualizerStore  from './store/EffectGraphicEqualizerStore.js'
import EffectGraphicEqualizerAction from './action/EffectGraphicEqualizerAction.js'

/**
 * Context of the graphic equalizer window.
 */
export default class EffectGraphicEqualizerContext extends Context {
  /**
   * Initialize instance.
   */
  constructor () {
    super()

    if (DEBUG) {
      console.log('Initialize EffectGraphicEqualizerContext')
    }

    /**
     * IPC module for renderer process.
     * @type {ipcRenderer}
     */
    this.ipc = window.require('electron').ipcRenderer

    /**
     * Provides a localStorage (Web Storage) of operating functions.
     * @type {LocalStorage}
     */
    this.localStorage = new LocalStorage()

    /**
     * Store of the graphic equalize.
     * @type {EffectGraphicEqualizerStore}
     */
    this.effectGraphicEqualizerStore = new EffectGraphicEqualizerStore(this)

    /**
     * Action of the graphic equalize.
     * @type {EffectGraphicEqualizerAction}
     */
    this.effectGraphicEqualizerAction = new EffectGraphicEqualizerAction(this)
  }
}
