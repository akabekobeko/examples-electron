
/**
 * Provide a utility method.
 */
export default class Util {
  /**
   * Converts the value of the Date object to its equivalent string representation using the specified format.
   *
   * @param {Date}   date   Date and time. Default is current date and time.
   * @param {string} format Date and time format string. Default is "YYYY-MM-DD hh:mm:ss.SSS".
   *
   * @return {string} Formatted string.
   *
   * @see http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
   */
  static formatDate (date, format) {
    const d = (date   === undefined ? new Date()                : date)
    let   f = (format === undefined ? 'YYYY-MM-DD hh:mm:ss.SSS' : format)

    // Zero padding
    f = f.replace(/YYYY/g, d.getFullYear())
    f = f.replace(/MM/g,   ('0' + (d.getMonth() + 1)).slice(-2))
    f = f.replace(/DD/g,   ('0' +        d.getDate()).slice(-2))
    f = f.replace(/hh/g,   ('0' +       d.getHours()).slice(-2))
    f = f.replace(/mm/g,   ('0' +     d.getMinutes()).slice(-2))
    f = f.replace(/ss/g,   ('0' +     d.getSeconds()).slice(-2))

    // Single digit
    f = f.replace(/M/g, d.getMonth() + 1)
    f = f.replace(/D/g, d.getDate())
    f = f.replace(/h/g, d.getHours())
    f = f.replace(/m/g, d.getMinutes())
    f = f.replace(/s/g, d.getSeconds())

    if (f.match(/S/g)) {
      const milliSeconds = ('00' + d.getMilliseconds()).slice(-3)
      for (let i = 0, max = f.match(/S/g).length; i < max; ++i) {
        f = f.replace(/S/, milliSeconds.substring(i, i + 1))
      }
    }

    return f
  }

  /**
   * Convert the seconds to a string.
   *
   * @param {number} seconds Seconds.
   *
   * @return {string} Converted string.
   */
  static secondsToString (seconds) {
    const total = Math.round(seconds)
    const h     = (total / 3600 | 0)
    const m     = ((total % 3600) / 60 | 0)
    const s     = (total % 60)

    function padding (num) {
      return ('0' + num).slice(-2)
    }

    return (0 < h ? h + ':' + padding(m) + ':' + padding(s) : 0 < m ? m + ':' + padding(s) : '0:' + padding(s))
  }
}
