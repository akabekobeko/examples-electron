import IndexedDBWrapper from '../../common/IndexedDBWrapper.js'
import Music from './Music.js'

/**
 * Manage for music databse.
 */
export default class MusicDatabase {
  /**
   * Initialize instance.
   */
  constructor () {
    /**
     * Database.
     * @type {IndexedDBWrapper}
     */
    this._db = new IndexedDBWrapper('music_db', 1, 'musics')
  }

  /**
   * Initialize database.
   *
   * @param  {Function} callback Callback function.
   */
  init (callback) {
    const params = {
      create: {
        keyPath: 'id',
        autoIncrement: true
      },
      index: [
        { name: 'path', keyPath: 'path', params: { unique: true } }
      ]
    }

    this._db.open(params, (err) => {
      callback(err)
    })
  }

  /**
   * Clear the database.
   *
   * @param {Function} callback Callback function.
   */
  clear (callback) {
    this._db.clear(callback)
  }

  /**
   * Add a music.
   *
   * @param {Object}   metadata Music metadata from main process.
   * @param {Function} callback Callback function.
   */
  add (metadata, callback) {
    this._db.add(metadata, callback)
  }

  /**
   * Delete a music.
   *
   * @param {Number}   musicId  Target identifier.
   * @param {Function} callback Callback function.
   */
  remove (musicId, callback) {
    this._db.remove(musicId, callback)
  }

  /**
   * Read all of the musics.
   *
   * @param {Function} callback Callback function.
   */
  readAll (callback) {
    this._db.readAll((err, items) => {
      if (err) {
        return callback(err, items)
      }

      const musics = items.map((item) => {
        return new Music(item)
      })

      callback(null, musics)
    })
  }
}
