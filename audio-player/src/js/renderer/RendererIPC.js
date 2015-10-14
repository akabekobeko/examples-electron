import { IPCKeys } from '../common/Constants.js';

/**
 * Manage the IPC of the renderer process.
 */
export default class RendererIPC {
  /**
   * Initialize instance.
   *
   * @param {AppContext} context Application context.
   */
  constructor( context ) {
    /**
     * Application context.
     * @type {AppContext}
     */
    this._contex = context;

    /**
     * Object for using inter-process communication.
     * @type {Object}
     */
    this._ipc = window.require( 'ipc' );

    // Event handlers
    this._ipc.on( IPCKeys.FinishImportMusic, this._onFinishImportMusic.bind( this ) );
  }

  /**
   * This sends an asynchronous message back to the render process.
   * Optionally, there can be one or a series of arguments, arg, which can have any type.
   *
   * @param  {String}    channel The event name.
   * @param  {...Object} args    Event arguments ( optional ).
   */
  send( channel, ...args ) {
    this._ipc.send( channel, args );
  }

  /**
   * Occurs when the import music is finished.
   */
  _onFinishImportMusic( music ) {
    console.log( music );
  }
}
