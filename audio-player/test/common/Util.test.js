import assert from 'power-assert';
import Util   from '../../src/js/common/Util.js';

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

  /** @test {Util#secondsToString} */
  describe( 'secondsToString', () => {
    it( '0:00', () => {
      const str = Util.secondsToString( 0 );
      assert( str === '0:00' );
    } )

    it( '0:0s', () => {
      const str = Util.secondsToString( 4 );
      assert( str === '0:04' );
    } )

    it( '0:ss', () => {
      const str = Util.secondsToString( 27 );
      assert( str === '0:27' );
    } )

    it( 'm:ss', () => {
      const str = Util.secondsToString( 150 );
      assert( str === '2:30' );
    } )

    it( 'mm:ss', () => {
      const str = Util.secondsToString( 721 );
      assert( str === '12:01' );
    } )

    it( 'h:mm:ss', () => {
      const str = Util.secondsToString( 3749 );
      assert( str === '1:02:29' );
    } )

    it( 'hh:mm:ss', () => {
      const str = Util.secondsToString( 100281 );
      assert( str === '27:51:21' );
    } )
  } );
} );
