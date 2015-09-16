import Assert from 'power-assert';
import Util   from '../src/js/util/Util.js';

/** @test {Util} */
describe( 'Util', () => {
  /** @test {Util#formatDate} */
  describe( 'formatDate', () => {
    it( '既定の書式 YYYY-MM-DD hh:mm:ss.SSS', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date );
      Assert( text === '2015-08-04 21:17:45.512' );
    } );

    it( 'ハイフンつなぎ YYYY-MM-DD-hh-mm-ss', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date, 'YYYY-MM-DD-hh-mm-ss' );
      Assert( text === '2015-08-04-21-17-45' );
    } );

    it( 'ゼロ詰めなし YYYY/M/D h:m:s', () => {
      const date = new Date( 2015, 7, 4, 21, 17, 45, 512 );
      const text = Util.formatDate( date, 'YYYY/M/D h:m:s' );
      Assert( text === '2015/8/4 21:17:45' );
    } );
  } );
} );
