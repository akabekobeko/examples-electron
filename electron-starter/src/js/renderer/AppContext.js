import { Context }  from 'material-flux';
import SampleStore  from './store/SampleStore.js';
import SampleAction from './action/SampleAction.js';

/**
 * アプリケーションを表します。
 */
export default class AppContext extends Context {
  /**
   * インスタンスを初期化します。
   */
  constructor() {
    super();

    this.sampleStore = new SampleStore( this );
    this.sampleAction = new SampleAction( this );
  }
}
