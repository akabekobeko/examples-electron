import { Context }       from 'material-flux';
import Util              from '../common/Util.js';
import AudioPlayerStore  from './store/AudioPlayerStore.js';
import AudioPlayerAction from './action/AudioPlayerAction.js';

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
     * Object for using modules main process from the renderer.
     * @type {Object}
     */
    this.remote = window.require( 'remote' );

    /**
     * Object for using inter-process communication.
     * @type {Object}
     */
    this.ipc = window.require( 'ipc' );

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
  }
}
