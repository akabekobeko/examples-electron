import IPC           from 'ipc';
import Dialog        from 'dialog';
import Fs            from 'original-fs';
import MusicMetadata from 'musicmetadata';
import { IPCKeys }   from '../common/Constants.js';

/**
 * Manage the IPC of the main process.
 */
export default class MainIPC {
  /**
   * Initialize instance.
   *
   * @param {BrowserWindow} appWindow Main window.
   */
  constructor( mainWindow ) {
    /**
     * Main window.
     * @type {BrowserWindow}
     */
    this._mainWindow = mainWindow;

    IPC.on( IPCKeys.RequestShowMessage, this._onRequestShowMessage.bind( this ) );
    IPC.on( IPCKeys.RequestShowOpenDialog, this._onRequestShowOpenDialog.bind( this ) );
    IPC.on( IPCKeys.RequestReadMusicMetadata, this._onRequestReadMusicMetadata.bind( this ) );
  }

  /**
   * Occurs when the show message dialog has been requested.
   *
   * @param {Event}  ev      Event data.
   * @param {Object} options Message box options.
   */
  _onRequestShowMessage( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishShowMessage, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const options = args[ 0 ];
    const button  = Dialog.showMessageBox( this._mainWindow, options );
    ev.sender.send( IPCKeys.FinishShowMessage, button, null );
  }

  /**
   * Occurs when the show file/folder open dialog has been requested.
   *
   * @param {Event}  ev      Event data.
   * @param {Object} options Message box options.
   */
  _onRequestShowOpenDialog( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishShowOpenDialog, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const options = args[ 0 ];
    const paths   = Dialog.showOpenDialog( this._mainWindow, options );
    ev.sender.send( IPCKeys.FinishShowOpenDialog, paths, null );
  }

  /**
   * Occurs when the import of music files has been requested.
   *
   * @param {Event} ev Event data.
   */
  _onRequestReadMusicMetadata( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishReadMusicMetadata, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const filePath = args[ 0 ];
    if( !( filePath ) ) { return; }

    this._readMusicMetadata( filePath, ( err, music ) => {
      ev.sender.send( IPCKeys.FinishReadMusicMetadata, err, music );
    } );
  }
  /*
  _onRequestImportMusic( ev ) {
    const options = {
      title: 'Select music files',
      filters: [
        { name: 'Musics', extensions: [ 'mp3', 'm4a', 'aac', 'wav'] }
      ],
      properties: [ 'openFile', 'multiSelections' ]
    };

    const filePaths = Dialog.showOpenDialog( this._mainWindow, options );
    if( !( filePaths ) ) { return; }

    const total   = filePaths.length;
    let   process = 0;
    filePaths.forEach( ( filePath ) => {
      this._readMusicMetadata( filePath, ( err, music ) => {
        ev.sender.send( IPCKeys.ProgressImportMusic, err, total, ++process,  music );
      } );
    } );
  }
  */

  /**
   * Read a music metadata form file.
   *
   * @param  {String}   filePath Music file path.
   * @param  {Function} callback Callback function.
   */
  _readMusicMetadata( filePath, callback ) {
    const stream = Fs.createReadStream( filePath );
    MusicMetadata( stream, { duration: true }, ( err, metadata ) => {
      if( err ) {
        return callback( err );
      }

      callback( null, {
        path:     filePath,
        title:    metadata.title || '',
        artist:   ( 0 < metadata.artist.length ? metadata.artist[ 0 ] : '' ),
        album:    metadata.album || '',
        duration: metadata.duration
      } );
    } );
  }
}
