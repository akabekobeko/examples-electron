import { Store } from 'material-flux';
import { Keys }  from '../action/SampleAction.js';
import Util      from '../../util/Util.js';

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

    this.state = {
      dateTime: Util.formatDate()
    };

    this.register( Keys.updateDatetime, this._actionUpdateDatetime );
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
}
