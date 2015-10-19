import { Store }     from 'material-flux';
import { Keys }      from '../action/MusicListAction.js';
import { IPCKeys }   from '../../common/Constants.js';
import MusicDatabase from '../model/MusicDatabase.js';
import MusicImporter from '../model/MusicImporter.js';
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
     * Music file importer.
     * @type {MusicImporter}
     */
    this._importer = new MusicImporter( context.ipc, this._db, this._onProgressImportMusic.bind( this ), this._onFinishImportMusic.bind( this ) );

    /**
     * Bound callback function.
     * @type {Function}
     */
    //this._onProgressImportMusicBind = this._onProgressImportMusic.bind( this );
    //this.context.ipc.addListener( IPCKeys.ProgressImportMusic, this._onProgressImportMusicBind );

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
    this._importer.execute();
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
   * @param {Object} music   Music data.
   * @param {Number} process The processed number.
   * @param {Number} total   The total number of music files.
   */
  _onProgressImportMusic( err, music, process, total ) {
    if( err ) {
      if( DEBUG ) { Util.error( err ); }
      return;
    }

    const newMusics = this.state.musics.concat( music );
    this.setState( { musics: newMusics } );

    if( DEBUG ) {
      Util.log( 'Import [' + process + '/' + total + '] : ' + music.path );
    }
  }

  /**
   * Occurs when a import music has been finished.
   */
  _onFinishImportMusic() {
    this.context.ipc.send( IPCKeys.RequestShowMessage, {
      type: 'info',
      title: 'Information',
      message: 'Import of music files has been completed.',
      buttons: [ 'OK' ]
    } );
  }
}
