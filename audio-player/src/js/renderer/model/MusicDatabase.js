import IndexedDBWrapper from './IndexedDBWrapper.js';

/**
 * Manage for music databse.
 */
export default class MusicDatabase {
  /**
   * Initialize instance.
   */
  constructor() {
    /**
     * Database.
     * @type {IndexedDBWrapper}
     */
    this._db = new IndexedDBWrapper( 'music_db', 1, 'musics' );
  }

  /**
   * Initialize database.
   *
   * @param  {Function} callback Callback function.
   */
  init( callback ) {
    const params = {
      create: {
        keyPath: 'id',
        autoIncrement: true
      },
      index: [
        { name: 'path', keyPath: 'path', params: { unique: true } }
      ]
    };

    this._db.open( params, ( err ) => {
      callback( err );
    } );
  }

  /**
   * Add a music file.
   *
   * @param {File}     file     File information.
   * @param {Function} callback Callback function.
   */
  add( file, callback ) {
    this._readMetadata( file, ( err, music ) => {
      if( err ) {
        return callback( err );
      }

      this._db.add( music, callback );
    } );
  }

  /**
   * Delete a music.
   *
   * @param {Number}   musicId  Target identifier.
   * @param {Function} callback Callback function.
   */
  remove( musicId, callback ) {
    this._db.remove( musicId, callback );
  }

  /**
   * Read all of the musics.
   *
   * @param {Function} callback Callback function.
   */
  readAll( callback ) {
    this._db.readAll( callback );
  }
}
