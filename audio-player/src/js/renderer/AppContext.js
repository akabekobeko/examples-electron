import { Context }       from 'material-flux';
import Util              from '../common/Util.js';
import RendererIPC       from './RendererIPC.js';
import AudioPlayerStore  from './store/AudioPlayerStore.js';
import AudioPlayerAction from './action/AudioPlayerAction.js';
import MusicListStore    from './store/MusicListStore.js';
import MusicListAction   from './action/MusicListAction.js';

/**
 * Application context.
 */
export default class AppContext extends Context {
  /**
   * Initialize instance.
   */
  constructor() {
    super();

    if( DEBUG ) {
      Util.log( 'Initialize AppContext' );
    }

    /**
     * Manage the IPC of the renderer process.
     * @type {RendererIPC}
     */
    this.ipc = new RendererIPC( this );

    /**
     * Audio player store.
     * @type {AudioPlayerStore}
     */
    this.audioPlayerStore = new AudioPlayerStore( this );

    /**
     * Audio player actions.
     * @type {AudioPlayerAction}
     */
    this.audioPlayerAction = new AudioPlayerAction( this );

    /**
     * Music list store.
     * @type {AudioPlayerStore}
     */
    this.musicListStore = new MusicListStore( this );

    /**
     * Music list actions.
     * @type {AudioPlayerAction}
     */
    this.musicListAction = new MusicListAction( this );
  }
}
