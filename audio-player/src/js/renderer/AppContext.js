import { Context }       from 'material-flux';
import { IPCKeys }       from '../common/Constants.js';
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
     * Path of the folder in which to save the image.
     * @type {String}
     */
    this.saveImageDirPath = null;

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

  /**
   * Setup application.
   *
   * @param {Function} cb Callback function.
   */
  setup( cb ) {
    Promise.resolve()
    .then( () => {
      return this._requestGetSaveImageDir();
    } )
    .then( () => {
      if( DEBUG ) { Util.log( 'Save image dir = ' + this.saveImageDirPath ); }

      cb();
    } );
  }

  /**
   * Request get the save image directory path.
   *
   * @return {Promise} Promise instance.
   */
  _requestGetSaveImageDir() {
    return new Promise( ( resolve ) => {
      const cb = ( path ) => {
        this.saveImageDirPath = path;
        this.ipc.removeListener( IPCKeys.FinishGetSaveImageDir, cb );
        resolve();
      };

      this.ipc.addListener( IPCKeys.FinishGetSaveImageDir, cb );
      this.ipc.send( IPCKeys.RequestGetSaveImageDir );
    } );
  }
}
