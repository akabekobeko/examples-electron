import IPC         from 'ipc';
import Dialog      from 'dialog';
import { IPCKeys } from '../common/Constants.js';

/**
 * Manage the dialog.
 */
export default class DialogManager {
  /**
   * Initialize instance.
   */
  constructor() {
    IPC.on( IPCKeys.RequestShowMessage,    this._onRequestShowMessage.bind( this ) );
    IPC.on( IPCKeys.RequestShowOpenDialog, this._onRequestShowOpenDialog.bind( this ) );
  }

  /**
   * Shows a message box.
   *
   * @param {BrowserWindow} ownerWindow BrowserWindow, Not required if null.
   * @param {Object}        options     Dialog options.
   *
   * @return {Number} Index of the selected button on dialog.
   */
  showMessage( ownerWindow, options ) {
    if( ownerWindow ) {
      return Dialog.showMessageBox( ownerWindow, options );
    }

    return Dialog.showMessageBox( options );
  }

  /**
   * Shows an open file/folder dialog.
   *
   * @param {BrowserWindow} ownerWindow BrowserWindow, Not required if null.
   * @param {Object}        options     Dialog options.
   *
   * @return {Array.<String>} On success this method returns an array of file paths chosen by the user, otherwise it returns undefined.
   */
  showOpenDialog( ownerWindow, options ) {
    if( ownerWindow ) {
      return Dialog.showOpenDialog( ownerWindow, options );
    }

    return Dialog.showOpenDialog( options );
  }

  /**
   * Occurs when the show message dialog has been requested.
   *
   * @param {Event}  ev      Event data.
   * @param {Object} options Options of a dialog.
   */
  _onRequestShowMessage( ev, options ) {
    if( !( options ) ) {
      ev.sender.send( IPCKeys.FinishShowMessage, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const button = this.showMessage( ev.sender.getOwnerBrowserWindow(), options );
    ev.sender.send( IPCKeys.FinishShowMessage, button, null );
  }

  /**
   * Occurs when the show file/folder open dialog has been requested.
   *
   * @param {Event}  ev      Event data.
   * @param {Object} options Options of a dialog.
   */
  _onRequestShowOpenDialog( ev, options ) {
    if( !( options ) ) {
      ev.sender.send( IPCKeys.FinishShowOpenDialog, new Error( 'Invalid arguments.' ), null );
      return;
    }

    const paths = this.showOpenDialog( ev.sender.getOwnerBrowserWindow(), options );
    ev.sender.send( IPCKeys.FinishShowOpenDialog, paths, null );
  }
}
