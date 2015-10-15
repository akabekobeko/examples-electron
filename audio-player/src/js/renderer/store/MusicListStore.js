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
      current: null
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
  get current() {
    return this.state.current;
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
    const current = ( target ? target : this.state.current );
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
    if( this.state.current ) {
      if( target.id !== this.state.current.id ) {
        this.setState( { current: target } );
      }
    } else {
      this.setState( { current: target } );
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
   * @param {Number} musicId music identify.
   */
  _actionRemove( musicId ) {
    this._db.remove( musicId, ( err ) => {
      if( err ) {
        if( DEBUG ) { Util.error( err ); }
        return;
      }

      const newMusics = this.state.musics.filter( ( music ) => {
        return ( music.id !== musicId );
      } );

      if( newMusics.length === this.state.musics.length ) {
        if( DEBUG ) { Util.error( 'Failed to remove the music, not found.' ); }
        return;
      }

      this.setState( { musics: newMusics } );
    } );
  }

  _onInitialize( err, musics ) {
    if( err ) {
      if( DEBUG ) { Util.error( err ); }
      return;
    }

    const state = { musics: musics };
    if( 0 < musics.length ) {
      state.current = musics[ 0 ];
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

    this._db.add( music, this._onAddMusic.bind( this ) );
  }

  /**
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
}
