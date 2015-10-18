import { Store }     from 'material-flux';
import { Keys }      from '../action/MusicListAction.js';
import { IPCKeys }   from '../../common/Constants.js';
import MusicDatabase from '../model/MusicDatabase.js';
import Util          from '../../common/Util.js';

/**
 * Manage for music list.
 */
export default class MusicListStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {AppContext} context Application context.
   */
  constructor( context ) {
    super( context );

    /**
     * Music database.
     * @type {MusicDatabase}
     */
    this._db = new MusicDatabase();

    /**
     * Bound callback function.
     * @type {Function}
     */
    this._onProgressImportMusicBind = this._onProgressImportMusic.bind( this );
    this.context.ipc.addListener( IPCKeys.ProgressImportMusic, this._onProgressImportMusicBind );

    /**
     * Collection of import result.
     * @type {Object}
     */
    this._importRepots = { success: [], error: [] };

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      /**
       * Music list.
       * @type {Array.<Music>}
       */
      musics: [],

      /**
       * Current music.
       * @type {Music}
       */
      currentMusic: null
    };

    this.register( Keys.init,   this._actionInit   );
    this.register( Keys.select, this._actionSelect );
    this.register( Keys.import, this._actionImport );
    this.register( Keys.remove, this._actionRemove );
  }

  /**
   * Get the all musics.
   *
   * @return {Array.<Music>} musics.
   */
  get musics() {
    return this.state.musics;
  }

  /**
   * Get the currently music.
   *
   * @return {Music} music.
   */
  get currentMusic() {
    return this.state.currentMusic;
  }

  /**
   * get the next music of the specified music.
   * Specified music it will return null if at the last of list.
   *
   * @param {Music}   target Target music.
   * @param {Boolean} prev   True if get in previous of the music. Default is false
   *
   * @return {Music} Success is music. Otherwise null.
   */
  next( target, prev ) {
    const current = ( target ? target : this.state.currentMusic );
    if( !( current ) ) { return null; }

    let next = null;
    this.state.musics.some( ( music, index ) => {
      if( music.id === current.id ) {
        const position =  ( prev ? index - 1 : index + 1 );
        next = this.state.musics[ position ];
        return true;
      }

      return false;
    } );

    return next;
  }

  /**
   * Initialize music list.
   */
  _actionInit() {
    this._db.init( ( err ) => {
      if( err ) {
        if( DEBUG ) { Util.error( err ); }
        return;
      }

      this._db.readAll( this._onInitialize.bind( this ) );
    } );
  }

  /**
   * Select the music.
   *
   * @param {Music} target music.
   */
  _actionSelect( target ) {
    if( this.state.currentMusic ) {
      if( target.id !== this.state.currentMusic.id ) {
        this.setState( { currentMusic: target } );
      }
    } else {
      this.setState( { currentMusic: target } );
    }
  }

  /**
   * Import the music from file.
   */
  _actionImport() {
    this.context.ipc.send( IPCKeys.RequestImportMusic );
  }

  /**
   * Remove the music.
   *
   * @param {Object} music Target music.
   */
  _actionRemove( music ) {
    this._db.remove( music.id, ( err ) => {
      if( err ) {
        if( DEBUG ) { Util.error( err ); }
        return;
      }

      const newMusics = this.state.musics.filter( ( m ) => {
        return ( m.id !== music.id );
      } );

      if( newMusics.length === this.state.musics.length ) {
        if( DEBUG ) { Util.error( 'Failed to remove the music, not found.' ); }
        return;
      }

      let nextCurrentMusic = this.next( music );
      if( !( nextCurrentMusic ) && 0 < newMusics.length ) {
        nextCurrentMusic = newMusics[ 0 ];
      }

      this.setState( { musics: newMusics, currentMusic: nextCurrentMusic } );
    } );
  }

  /**
   * Occurs when it is initialized.
   *
   * @param {Error}          err    Error information. Success is undefined.
   * @param {Array.<Object>} musics Loaded music collection.
   */
  _onInitialize( err, musics ) {
    if( err ) {
      if( DEBUG ) { Util.error( err ); }
      return;
    }

    const state = { musics: musics };
    if( 0 < musics.length ) {
      state.currentMusic = musics[ 0 ];
    }

    this.setState( state );
  }

  /**
   * Occurs when a music file of impot has been executed.
   *
   * @param {Error}  err     Error information. Success is undefined.
   * @param {Number} total   The total number of music files.
   * @param {Number} process Error The number of processing
   * @param {Object} music   Music metadata.
   */
  _onProgressImportMusic( err, total, process, music ) {
    if( err ) {
      if( DEBUG ) { Util.error( err ); }
      return;
    }

    // Check supported type
    let audio = new Audio( music.path );
    audio.addEventListener( 'loadedmetadata', () => {
      audio = null;
      this._db.add( music, this._onAddMusic.bind( this ) );

      this._importRepots.success.push( music.path );
      if( total === process ) {
        this._onFinishImport();
      }
    } );

    audio.addEventListener( 'error', ( ev ) => {
      audio = null;
      if( DEBUG ) { Util.error( 'Unsupported audio file.' ) }
 
      this._importRepots.error.push( music.path );
      if( total === process ) {
        this._onFinishImport();
      }
    } );
  }

  /**
   * Occurs when a music added.
   *
   * @param {Error}  err   Error information. Success is undefined.
   * @param {Object} music Music metadata.
   */
  _onAddMusic( err, music ) {
    if( err ) {
      if( DEBUG ) { Util.error( err ); }
      return;
    }

    const newMusics = this.state.musics.concat( music );
    this.setState( { musics: newMusics } );
  }

  /**
   * Occurs when the import of the music has finished.
   */
  _onFinishImport() {
    let message = '';

    const success = this._importRepots.success;
    this._importRepots.success = [];
    if( 0 < success.length ) {
      message += 'Success:\n';
      success.forEach( ( path ) => {
        message += path + '\n';
      } );
      message += '\n'
    }

    const error = this._importRepots.error;
    this._importRepots.error = [];
    if( 0 < error.length  ) {
      message += 'Error:\n'
      error.forEach( ( path ) => {
        message += path + '\n';
      } );
    }

    this.context.ipc.send( IPCKeys.RequestShowMessage, {
      type: 'info',
      title: 'Import reports',
      message: 'Import reports.',
      detail: message,
      buttons: [ 'OK', 'Cancel' ]
    } );
  }
}
