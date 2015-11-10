import IPC                 from 'ipc';
import Dialog              from 'dialog';
import { IPCKeys }         from '../common/Constants.js';
import MusicMetadataReader from './model/MusicMetadataReader.js'

/**
 * Manage the IPC of the main process.
 */
export default class MainIPC {
  /**
   * Initialize instance.
   *
   * @param {App} context Application cotext.
   */
  constructor( context ) {
    /**
     * Application cotext.
     * @type {App}
     */
    this._context = context;

    /**
     * Music metadata reader.
     * @type {MusicMetadataReader}
     */
    this._metadataReader = new MusicMetadataReader( this._context.saveImageDirPath );

    IPC.on( IPCKeys.RequestShowMessage,       this._onRequestShowMessage.bind( this ) );
    IPC.on( IPCKeys.RequestShowOpenDialog,    this._onRequestShowOpenDialog.bind( this ) );
    IPC.on( IPCKeys.RequestReadMusicMetadata, this._onRequestReadMusicMetadata.bind( this ) );
  }

  /**
   * Occurs when the show message dialog has been requested.
   *
   * @param {Event}  ev   Event data.
   * @param {Object} args Arguments.
   */
  _onRequestShowMessage( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishShowMessage, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const options = args[ 0 ];
    const button  = Dialog.showMessageBox( this._context.mainWindow, options );
    ev.sender.send( IPCKeys.FinishShowMessage, button, null );
  }

  /**
   * Occurs when the show file/folder open dialog has been requested.
   *
   * @param {Event}  ev   Event data.
   * @param {Object} args Arguments.
   */
  _onRequestShowOpenDialog( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishShowOpenDialog, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const options = args[ 0 ];
    const paths   = Dialog.showOpenDialog( this._context.mainWindow, options );
    ev.sender.send( IPCKeys.FinishShowOpenDialog, paths, null );
  }

  /**
   * Occurs when the import of music files has been requested.
   *
   * @param {Event}  ev   Event data.
   * @param {Object} args Arguments.
   */
  _onRequestReadMusicMetadata( ev, args ) {
    if( !( args ) ) {
      ev.sender.send( IPCKeys.FinishReadMusicMetadata, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const filePath = args[ 0 ];
    if( !( filePath ) ) { return; }

    this._metadataReader.read( filePath, ( err, music ) => {
      ev.sender.send( IPCKeys.FinishReadMusicMetadata, err, music );
    } );
  }
}
