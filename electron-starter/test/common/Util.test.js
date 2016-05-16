import assert from 'assert';
import Util from '../../src/js/common/Util.js';

/** @test {Util} */
describe( 'Util', () => {
  /** @test {Util#formatDate} */
  describe( 'formatDate', () => {
    it( 'Default YYYY-MM-DD hh:mm:ss.SSS', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date );
      assert( text === '2015-08-04 21:17:45.512' );
    } );

    it( 'Hyphen YYYY-MM-DD-hh-mm-ss', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date, 'YYYY-MM-DD-hh-mm-ss' );
      assert( text === '2015-08-04-21-17-45' );
    } );

    it( 'No zero-padding YYYY/M/D h:m:s', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date, 'YYYY/M/D h:m:s' );
      assert( text === '2015/8/4 21:17:45' );
    } );
  } );
} );
