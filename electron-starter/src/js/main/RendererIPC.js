import IPC         from 'ipc';
import Shell       from 'shell';
import { IPCKeys } from '../common/Constants.js';

/**
 * Communicates for renderer process by the IPC.
 */
export default class RendererIPC {
  /**
   * Initialize instance.
   */
  constructor() {
    IPC.on( IPCKeys.ShowURL, this._onShowURL.bind( this ) );
  }

  /**
   * Occurs when a show link requested.
   *
   * @param {Event}  ev  Event data.
   * @param {String} url URL.
   */
  _onShowURL( ev, url ) {
    Shell.openExternal( url );
  }
}
