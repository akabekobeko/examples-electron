import Fs from 'fs'

/**
 * Provide a utility of file/folder operation methods.
 */
export default class FileUtil {
  /**
   * Asynchronous mkdir(2). No arguments other than a possible exception are given to the completion callback.
   * mode defaults to 0o777.
   *
   * @param {String} path Directory path.
   * @param {Function} cb Callback function.
   */
  static mkdir (path, cb) {
    if (FileUtil.existsSync(path)) {
      console.log('mkdir cancel exists')
      return cb()
    }

    Fs.mkdir(path, (err) => {
      cb(err)
    })
  }

  /**
   * Asynchronously writes data to a file, replacing the file if it already exists. data can be a buffer.
   *
   * @param {String} path Write file path.
   * @param {ArrayBuffer} data Target data.
   * @param {Function} cb Callback function.
   * @param {Boolean} overwrite True if to overwrite the file. Default is false.
   */
  static writeFile (path, data, cb, overwrite) {
    if (!(overwrite) && FileUtil.existsSync(path)) {
      console.log('writeFile cancel exists')
      return cb()
    }

    Fs.writeFile(path, data, (err) => {
      cb(err)
    })
  }

  /**
   * Check the existence of a file or folder.
   *
   * @param {String} path Path of the file or folder.
   *
   * @return {Boolean} "true" if exists. Otherwise false.
   */
  static existsSync (path) {
    try {
      Fs.accessSync(path, Fs.F_OK)
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Read file
   * @param path Local file path
   * @returns {Promise}
   * @private
   */
  static readFile (path) {
    return new Promise((resolve, reject) => {
      Fs.readFile(path, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
