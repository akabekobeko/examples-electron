import { IPCKeys } from '../../common/Constants.js';

/**
 * Import the music files.
 */
export default class MusicImporter {
  /**
   * Initialize instance.
   *
   * @param {RendererIPC}   ipc        Manage the IPC of the renderer process.
   * @param {MusicDatabase} db         Music database.
   * @param {Function}      onProgress Callback function that occur when one reviews import has been finished.
   * @param {Function}      onFinish   Callback function that occurs when all of the import has been finished.
   *
   * @throws {Error} Invalid argument.
   */
  constructor( ipc, db, onProgress, onFinish ) {
    if( !( ipc && db && typeof onProgress === 'function' && typeof onFinish === 'function' ) ) {
      throw new Error( 'Invalid arguments.' );
    }

    /**
     * Manage the IPC of the renderer process.
     * @type {RendererIPC}
     */
    this._ipc = ipc;

    /**
     * Music database.
     * @type {MusicDatabase}
     */
    this._db = db;

    /**
     * Callback function that occur when one reviews import has been finished.
     * @type {Function}
     */
    this._onProgress = onProgress;

    /**
     * Callback function that occurs when all of the import has been finished.
     * @type {Function}
     */
    this._onFinish = onFinish;

    /**
     * The total processes number.
     * @type {Number}
     */
    this._total = 0;

    /**
     * The processed number.
     * @type {Number}
     */
    this._process = 0;

    /**
     * Path collection of files.
     * @type {Array.<String>}
     */
    this._filePaths = null;

    /**
     * Current import file path.
     * @type {[type]}
     */
    this._currentFilePath = null;

    this._ipc.addListener( IPCKeys.FinishShowOpenDialog, this._onFinishShowOpenDialog.bind( this ) );
    this._ipc.addListener( IPCKeys.FinishReadMusicMetadata, this._onFinishReadMusicMetadata.bind( this ) );
  }

  /**
   * Begin the import of music files.
   */
  execute() {
    this._ipc.send( IPCKeys.RequestShowOpenDialog, {
      title: 'Select music files',
      filters: [
        { name: 'Musics', extensions: [ 'mp3', 'm4a', 'aac', 'wav'] }
      ],
      properties: [ 'openFile', 'multiSelections' ]
    } );
  }

  /**
   * Execute the import of music.
   */
  _importMusic() {
    // Check complete
    if( this._process === this._total ) {
      this._onCompleteImportMusic();
    }
    ++this._process;

    this._currentFilePath = this._filePaths[ 0 ];
    this._filePaths.shift();

    let audio = new Audio( this._currentFilePath );
    audio.addEventListener( 'loadedmetadata', () => {
      audio = null;
      this._ipc.send( IPCKeys.RequestReadMusicMetadata, this._currentFilePath );
    } );

    audio.addEventListener( 'error', () => {
      const err = new Error( 'Unsupported music file: ' + this._currentFilePath );
      this._onProgress( err, null, this._process, this._total );

      // Next
      audio = null;
      this._importMusic();
    } );
  }

  /**
   * Occurs when a music file of impot has been executed.
   *
   * @param {Array.<String>} File/Folder paths.
   */
  _onFinishShowOpenDialog( paths ) {
    if( !( paths ) ) {
      this._onFinish( true );
      this._onProgress = null;
      this._onFinish   = null;
      return;
    }

    this._total     = paths.length;
    this._process   = 0;
    this._filePaths = paths;

    this._importMusic();
  }

  /**
   * Occurs when a music file of read metadata has been executed.
   *
   * @param {Error}  err   Error information. Success is undefined.
   * @param {Object} music Music metadata.
   */
  _onFinishReadMusicMetadata( err, music ) {
    if( err ) {
      this._onProgress( err, null, this._process, this._total );
      this._importMusic();
      return;
    }

    // Register database
    this._db.add( music, ( err2, music2 ) => {
      if( err2 ) {
        this._onProgress( err2, null, this._process, this._total );
      } else {
        this._onProgress( null, music2, this._process, this._total );
      }

      this._importMusic();
    } );
  }

  /**
   * Occurs when a music file of impot has been completed.
   */
  _onCompleteImportMusic() {
    this._onFinish();
  }
}
