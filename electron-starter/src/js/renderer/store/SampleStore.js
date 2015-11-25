import { Store }   from 'material-flux';
import { Keys }    from '../action/SampleAction.js';
import { IPCKeys } from '../../common/Constants.js';
import Util        from '../../common/Util.js';

/**
 * Sample store.
 */
export default class SampleStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {AppContext} context Application context.
   */
  constructor( context ) {
    super( context );

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      dateTime: Util.formatDate()
    };

    this.register( Keys.updateDatetime, this._actionUpdateDatetime );
    this.register( Keys.showURL,        this._actionShowURL        );
  }

  /**
   * Get datetime.
   *
   * @return {String} datetime.
   */
  get datetime() {
    return this.state.dateTime;
  }

  /**
   * Update datetime.
   */
  _actionUpdateDatetime() {
    this.setState( { dateTime: Util.formatDate() } );
  }

  /**
   * Show a URL in an external web browser.
   *
   * @param {String} url URL.
   */
  _actionShowURL( url ) {
    this.context.ipc.send( IPCKeys.RequestShowURL, url );
  }
}
