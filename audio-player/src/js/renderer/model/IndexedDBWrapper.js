/**
 * IndexedDB wrapper.
 */
 export default class IndexedDBWrapper {
  /**
   * Initialize instance.
   *
   * @param {String} dbName      Database name.
   * @param {Number} dbVersion   Database version.
   * @param {String} dbStoreName Store name.
   *
 * @throws {Error} IndexedDB is undefined.
   */
  constructor( dbName, dbVersion, dbStoreName ) {
    // Check exists IndexedDB
    this._indexedDB = ( window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB );
    if( !( this._indexedDB ) ) {
      throw new Error( 'IndexedDB not supported.' );
    }

    /**
     * Database.
     * @type {IDBDatabase}
     */
    this._db = null;

    /**
     * Database name.
     * @type {String}
     */
    this._dbName = dbName;

    /**
     * Database version.
     * @type {Number}
     */
    this._dbVersion = dbVersion;

    /**
     * Store name.
     * @type {[String]}
     */
    this._dbStoreName = dbStoreName;
  }

  /**
   * Default callback.。
   *
   * @param  {Error} err Error information。
   *
   * @return Allways false. Cursor processing is abort.
   */
  _defaultCallback( err ) {
    if( err ) {
      console.error( 'DB [callback]: Error, ' + err.message );
    } else {
      console.log( 'DB [callback]: Success' );
    }

    return false;
  }

  /**
   * Open the database.
   *
   * @param {Object}   params   Parameters.
   * @param {Function} callback Callback function.
   *
   * @throws {Error} "params.create" is undefined.
   */
  open( params, callback ) {
    if( !( params && params.create ) ) { throw new Error( 'Invalid arguments' ); }

    const onFinish = ( callback || this._defaultCallback );
    const request  = this._indexedDB.open( this._dbName, this._dbVersion );

    request.onupgradeneeded = ( ev ) => {
      this._db = ev.target.result;
      const store = this._db.createObjectStore( this._dbStoreName, params.create );

      // Use index
      if( params.index && 0 < params.index.length ) {
        params.index.forEach( function( index ) {
          store.createIndex( index.name, index.keyPath, index.params );
        } );
      }

      const target = ev.target;
      target.transaction.oncomplete = () => {
        onFinish();
      };
    };

    request.onsuccess = ( ev ) => {
      this._db = ev.target.result;
      onFinish();
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error );
    };
  }

  /**
   * Dispose the database.
   *
   * @param {Function} callback Callback function.
   */
  dispose( callback ) {
    const onFinish = ( callback || this._defaultCallback );

    if( this._db ) {
      this._db.close();
      this._db = null;
    }

    const request = this._indexedDB.deleteDatabase( this._dbName );
    request.onsuccess = () => {
      onFinish();
    };

    request.onerror = ( ev ) => {
      console.log( 'DB [ dispose ]: Error, ' + ev.target.error );
      onFinish( ev.target.error );
    };
  }

  /**
   * Clear the database.
   *
   * @param {Function} callback Callback function.
   */
  clear( callback ) {
    if( !( this._db ) ) { return; }

    const onFinish    = ( callback || this._defaultCallback );
    const transaction = this._db.transaction( this._dbStoreName, 'readwrite' );
    const store       = transaction.objectStore( this._dbStoreName );
    const request     = store.clear();

    request.onsuccess = () => {
      onFinish();
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error );
    };
  }

  /**
   * Read all of the items.
   *
   * @param {Function} callback Callback function.
   */
  readAll( callback ) {
    if( !( this._db ) ) { return; }

    const onFinish    = ( callback || this._defaultCallback );
    const transaction = this._db.transaction( this._dbStoreName, 'readonly' );
    const store       = transaction.objectStore( this._dbStoreName );
    const request     = store.openCursor();
    const items       = [];

    request.onsuccess = ( ev ) => {
      const cursor = ev.target.result;
      if( cursor ) {
        items.push( cursor.value );
        cursor.continue();

      } else {
        onFinish( null, items );
      }
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error );
    };
  }

  /**
   * Read until stop all of the items.
   *
   * @param {Function} callback Callback function ( Each item ). Want to continue returns true.
   */
  readSome( callback ) {
    if( !( this._db ) ) { return; }

    const onFinish    = ( callback || this._defaultCallback );
    const transaction = this._db.transaction( this._dbStoreName, 'readonly' );
    const store       = transaction.objectStore( this._dbStoreName );
    const request     = store.openCursor();

    request.onsuccess = ( ev ) => {
      const cursor = ev.target.result;
      if( cursor ) {
        if( onFinish( null, cursor.value ) ) {
          cursor.continue();
        }
      } else {
        onFinish( null, cursor.value );
      }
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error );
    };
  }

  /**
   * Add or update an item.
   *
   * @param {Object}   item     Item. Updates if existing identifier is set.
   * @param {Function} callback Callback function.
   */
  add( item, callback ) {
    if( !( this._db ) ) { return; }

    const onFinish    = ( callback || this._defaultCallback );
    const transaction = this._db.transaction( this._dbStoreName, 'readwrite' );
    const store       = transaction.objectStore( this._dbStoreName );
    const request     = store.put( item );

    request.onsuccess = ( ev ) => {
      const newItem = item;
      newItem.id = ev.target.result;
      onFinish( null, newItem );
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error, item );
    };
  }

  /**
   * Delete an item.
   *
   * @param {Number}   id               Identifier of the item.
   * @param {Function} callbackCallback function.
   */
  remove( id, callback ) {
    if( !( this._db ) ) { return; }

    const onFinish    = ( callback || this._defaultCallback );
    const transaction = this._db.transaction( this._dbStoreName, 'readwrite' );
    const store       = transaction.objectStore( this._dbStoreName );
    const request     = store.delete( id );

    request.onsuccess = () => {
      onFinish( null, id );
    };

    request.onerror = ( ev ) => {
      onFinish( ev.target.error, id );
    };
  }
}
