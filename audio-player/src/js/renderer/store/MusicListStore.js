import { Store }     from 'material-flux';
import { Keys }      from '../action/MusicListAction.js';
import { IPCKeys }   from '../../common/Constants.js';
import MusicDatabase from '../model/MusicDatabase.js';
import MusicImporter from '../model/MusicImporter.js';
import Artist        from '../model/Artist.js';
import Album         from '../model/Album.js';
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
      currentMusic: null,

      /**
       * Artist list.
       * @type {Array.<Artist>}
       */
      artists: [],

      /**
       * Current Artist
       * @type {[type]}
       */
      currentArtist: null
    };

    this.register( Keys.init,         this._actionInit );
    this.register( Keys.select,       this._actionSelect );
    this.register( Keys.selectArtist, this._actionSelectArtist );
    this.register( Keys.import,       this._actionImport );
    this.register( Keys.remove,       this._actionRemove );
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
   * Get the all artist.
   *
   * @return {Array.<Artist>} artists.
   */
  get artists() {
    return this.state.artists;
  }

  /**
   * Get the currently artist.
   *
   * @return {Artist} artist.
   */
  get currentArtist() {
    return this.state.currentArtist;
  }

  /**
   * Get the next music of the specified music.
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
   * @param {Music} music Target music.
   */
  _actionSelect( music ) {
    if( this.state.currentMusic ) {
      if( music.id !== this.state.currentMusic.id ) {
        this.setState( { currentMusic: music } );
      }
    } else {
      this.setState( { currentMusic: music } );
    }
  }

  /**
   * Select the artist.
   *
   * @param {Artist} artist Target artist.
   */
  _actionSelectArtist( artist ) {
    if( this.state.currentArtist ) {
      if( artist.name !== this.state.currentArtist.name ) {
        this.setState( { currentArtist: artist } );
      }
    } else {
      this.setState( { currentArtist: artist } );
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

    if( !( musics && musics.length ) ) {
      return;
    }

    const artists = Artist.fromMusics( musics );
    const state   = { musics: musics, artists: artists };

    if( 0 < musics.length ) {
      state.currentMusic = musics[ 0 ];
    }

    if( 0 < artists.length ) {
      state.currentArtist = artists[ 0 ];
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

    if( DEBUG ) {
      Util.log( 'Import [' + process + '/' + total + '] : ' + music.path );
    }

    const newMusics = this.state.musics.concat( music );
    const state     = { musics: newMusics };

    let artist = Artist.findByMusic( this.state.artists, music );
    if( artist ) {
      let album = Album.findByMusic( artist.albums, music );
      if( album ) {
        album.add( music );
      } else {
        album = new Album( artist.name, music.album );
        album.add( music );
        artist.add( album )
      }
    } else {
      artist = new Artist( music.artist );
      let album = new Album( artist.name, music.album );
      album.add( music );
      artist.add( album );

      state.artists = this.state.artists.concat( artist ).sort( Artist.compare );
    }

    this.setState( state );
  }

  /**
   * Occurs when a import music has been finished.
   *
   * @param {Boolean} canceld True if it is canceled. Default is false.
   */
  _onFinishImportMusic( canceld ) {
    if( canceld ) { return; }

    this.context.ipc.send( IPCKeys.RequestShowMessage, {
      type: 'info',
      title: 'Information',
      message: 'Import of music files has been completed.',
      buttons: [ 'OK' ]
    } );
  }
}
