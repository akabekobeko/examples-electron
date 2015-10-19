
/**
 * Provide a utility method.
 */
export default class Util {
  /**
   * Converts the value of the Date object to its equivalent string representation using the specified format.
   *
   * @param {Date}   date   Date and time. Default is current date and time.
   * @param {String} format Date and time format string. Default is "YYYY-MM-DD hh:mm:ss.SSS".
   *
   * @return {String} Formatted string.
   *
   * @see http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
   */
  static formatDate( date, format ) {
    date   = ( date   === undefined ? new Date()                : date   );
    format = ( format === undefined ? 'YYYY-MM-DD hh:mm:ss.SSS' : format );

    // Zero padding
    format = format.replace( /YYYY/g, date.getFullYear() );
    format = format.replace( /MM/g,   ( '0' + ( date.getMonth() + 1 ) ).slice( -2 ) );
    format = format.replace( /DD/g,   ( '0' +          date.getDate() ).slice( -2 ) );
    format = format.replace( /hh/g,   ( '0' +         date.getHours() ).slice( -2 ) );
    format = format.replace( /mm/g,   ( '0' +       date.getMinutes() ).slice( -2 ) );
    format = format.replace( /ss/g,   ( '0' +       date.getSeconds() ).slice( -2 ) );

    // Single digit
    format = format.replace( /M/g, date.getMonth() + 1 );
    format = format.replace( /D/g, date.getDate() );
    format = format.replace( /h/g, date.getHours() );
    format = format.replace( /m/g, date.getMinutes() );
    format = format.replace( /s/g, date.getSeconds() );

    if( format.match( /S/g ) ) {
      const milliSeconds = ( '00' + date.getMilliseconds() ).slice( -3 );
      for( let i = 0, max = format.match( /S/g ).length; i < max; ++i ) {
        format = format.replace( /S/, milliSeconds.substring( i, i + 1 ) );
      }
    }

    return format;
  }

  /**
   * Convert the seconds to a string.
   *
   * @param {Number} seconds Seconds.
   *
   * @return {String} Converted string.
   */
  static secondsToString( seconds ) {
    const total = Math.round( seconds );
    const h     = ( total / 3600 | 0 );
    const m     = ( ( total % 3600 ) / 60 | 0 );
    const s     = ( total % 60 );

    function padding( num ) {
      return ( '0' + num ).slice( -2 );
    }

    return (
      0 < h ? h + ':' + padding( m ) + ':' + padding( s ) :
      0 < m ?                      m + ':' + padding( s ) :
                                      '0:' + padding( s )
    );
  }

  /**
   * Output console log with datetime.
   *
   * @param {String} message Message.
   */
  static log( message ) {
    console.log( '[' + Util.formatDate() + ']', message );
  }

  /**
   * Output console error with datetime.
   *
   * @param {String} message Message.
   */
  static error( message ) {
    console.error( '[' + Util.formatDate() + ']', message );
  }
}
