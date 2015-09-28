import { Context }  from 'material-flux';
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

    this.remote = window.require( 'remote' );
    this.ipc    = window.require( 'ipc' );

    this.sampleStore  = new SampleStore( this );
    this.sampleAction = new SampleAction( this );
  }
}
