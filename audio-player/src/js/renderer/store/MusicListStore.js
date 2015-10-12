import { Store }     from 'material-flux';
import { Keys }      from '../actions/MusicListAction.js';
import { IPCKeys }   from '../../common/Constants.js';
import MusicDatabase from '../model/MusicDatabase.js';

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
     * Audio element.
     * @type {HTMLAudioElement}
     */
    this._audioElement = new Audio();

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
    this.register( Keys.add,    this._actionAdd    );
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
    this._musicList.init( ( err ) => {
      if( err ) {
        console.error( err );
      } else {
        this._musicList.readAll( ( err2, musics ) => {
          if( err2 ) {
            console.error( err2 );
          } else {
            const state = { musics: musics };
            if( 0 < musics.length ) {
              state.current = musics[ 0 ];
            }

            this.setState( state );
          }
        } );
      }
    } );
  }

  /**
   * Select the music.
   *
   * @param {Music} target music.
   */
  _actionSelect( target ) {
    if( this.state.current && target && this.state.current.id === target.id ) { return false; }

    let newMusic = null;
    this.state.musics.some( ( music ) => {
      if( target.id === music.id ) {
        newMusic = music;
        return true;
      }

      return false;
    } );

    if( newMusic ) {
      this.setState( { current: newMusic } );
    } else {
      console.error( 'Failed to select the music, not found.' );
    }
  }

  /**
   * Add the music.
   */
  _actionAdd() {
    this._openFileDialog.show();
  }

  /**
   * Remove the music.
   *
   * @param {Number} musicId music identify.
   */
  _actionRemove( musicId ) {
    this._musicList.remove( musicId, ( err ) => {
      if( err ) {
        console.error( err );
      } else {
        const newMusics = this.state.musics.filter( ( music ) => {
          return ( music.id !== musicId );
        } );

        if( newMusics.length !== this.state.musics.length ) {
          this.setState( { musics: newMusics } );
        } else {
          console.error( 'Failed to remove the music, not found.' );
        }
      }
    } );
  }

  /**
   * Occur when the files to be added interest has been selected.
   *
   * @param {FileList} files file list.
   */
  _onSelectFiles( files ) {
    if( !( files && 0 < files.length ) ) { return; }

    const onAdded = ( err, music ) => {
      if( err ) {
        console.error( err );
      } else {
        const newMusics = this.state.musics.concat( music );
        this.setState( { musics: newMusics } );
      }
    };

    for( let i = 0, max = files.length; i < max; ++i ) {
      this._musicList.add( files[ i ], onAdded );
    }
  }

  /**
   * Read a music file metadata.
   *
   * @param {File} file File information.
   */
  _readMetadata( file ) {
    if( this._audioElement.canPlayType( file.type ) ) {
      this._context.ipc.send( IPCKeys.ReadMusicMetadata, file );
    }
  }
}
