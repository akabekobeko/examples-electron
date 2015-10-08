import { Context }  from 'material-flux';
import Util         from '../common/Util.js';
import SampleStore  from './store/SampleStore.js';
import SampleAction from './action/SampleAction.js';

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
     * Sample store.
     * @type {SampleStore}
     */
    this.sampleStore = new SampleStore( this );

    /**
     * Sample actions.
     * @type {SampleAction}
     */
    this.sampleAction = new SampleAction( this );
  }
}
