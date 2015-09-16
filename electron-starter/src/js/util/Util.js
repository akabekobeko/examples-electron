
/**
 * ユーテリティ メソッドを提供します。
 */
export default class Util {
  /**
   * 日時データを指定された書式に基いて文字列化します。
   *
   * @param {Date}   date   日時データ。省略時は最新の日時。
   * @param {String} format 書式指定。省略時は "YYYY-MM-DD hh:mm:ss.SSS"。
   *
   * @return {String} 文字列。
   *
   * @see http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
   */
  static formatDate( date, format ) {
    date   = ( date   === undefined ? new Date()                : date   );
    format = ( format === undefined ? 'YYYY-MM-DD hh:mm:ss.SSS' : format );

    format = format.replace( /YYYY/g, date.getFullYear() );
    format = format.replace( /MM/g,   ( '0' + ( date.getMonth() + 1 ) ).slice( -2 ) );
    format = format.replace( /DD/g,   ( '0' +          date.getDate() ).slice( -2 ) );
    format = format.replace( /hh/g,   ( '0' +         date.getHours() ).slice( -2 ) );
    format = format.replace( /mm/g,   ( '0' +       date.getMinutes() ).slice( -2 ) );
    format = format.replace( /ss/g,   ( '0' +       date.getSeconds() ).slice( -2 ) );

    // ゼロ詰め置換を経ても残っているなら、そのまま数値化
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
}
