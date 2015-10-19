import IPC         from 'ipc';
import Shell       from 'shell';
import { IPCKeys } from '../common/Constants.js';

/**
 * Communicates for renderer process by the IPC.
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
    IPC.on( IPCKeys.RequestShowURL, this._onRequestShowURL.bind( this ) );
  }

  /**
   * Occurs when the show message dialog has been requested.
   *
   * @param {Event} ev   Event data.
   * @param {Array} args Arguments.
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
   * @param {Event} ev   Event data.
   * @param {Array} args Arguments.
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
   * Occurs when a show link requested.
   *
   * @param {Event} ev   Event data.
   * @param {Array} args Arguments.
   */
  _onRequestShowURL( ev, args ) {
    Shell.openExternal( args[ 0 ] );
    ev.sender.send( IPCKeys.FinishShowURL );
  }
}
