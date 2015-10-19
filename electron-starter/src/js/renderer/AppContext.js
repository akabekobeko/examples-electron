import { Context }  from 'material-flux';
import Util         from '../common/Util.js';
import RendererIPC  from './RendererIPC.js';
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
     * Manage the IPC of the renderer process.
     * @type {RendererIPC}
     */
    this.ipc = new RendererIPC( this );

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
