import { Context } from 'material-flux'
import AudioPlayerStore from './store/AudioPlayerStore.js'
import AudioPlayerAction from './action/AudioPlayerAction.js'
import MusicListStore from './store/MusicListStore.js'
import MusicListAction from './action/MusicListAction.js'

/**
 * Context of application.
 */
export default class AppContext extends Context {
  /**
   * Initialize instance.
   */
  constructor () {
    super()

    if (DEBUG) {
      console.log('Initialize AppContext')
    }

    /**
     * IPC module for renderer process.
     * @type {ipcRenderer}
     */
    this.ipc = window.require('electron').ipcRenderer

    /**
     * Audio player store.
     * @type {AudioPlayerStore}
     */
    this.audioPlayerStore = new AudioPlayerStore(this)

    /**
     * Audio player actions.
     * @type {AudioPlayerAction}
     */
    this.audioPlayerAction = new AudioPlayerAction(this)

    /**
     * Music list store.
     * @type {AudioPlayerStore}
     */
    this.musicListStore = new MusicListStore(this)

    /**
     * Music list actions.
     * @type {AudioPlayerAction}
     */
    this.musicListAction = new MusicListAction(this)
    this.musicListAction.init()
  }
}
