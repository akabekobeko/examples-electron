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

    /**
     * Event handlers.
     * @type {Object}
     */
    this._listners = {};

    // Event handlers
    this._ipc.on( IPCKeys.FinishShowMessage,       this._onFinishShowMessage.bind( this ) );
    this._ipc.on( IPCKeys.FinishShowOpenDialog,    this._onFinishShowOpenDialog.bind( this ) );
    this._ipc.on( IPCKeys.FinishReadMusicMetadata, this._onFinishReadMusicMetadata.bind( this ) );
    this._ipc.on( IPCKeys.FinishGetSaveImageDir,   this._onFinishGetSaveImageDir.bind( this ) );
  }

  /**
   * This sends an asynchronous message back to the render process.
   * Optionally, there can be one or a series of arguments, arg, which can have any type.
   *
   * @param {String}    channel The event name.
   * @param {...Object} args    Event arguments ( optional ).
   */
  send( channel, ...args ) {
    this._ipc.send( channel, args );
  }

  /**
   * Adds a listener to the end of the listeners array for the specified IPC channel.
   *
   * @param {String}   channel  IPC channel. Specify the value defined in IPCKeys.
   * @param {Function} listener Channel listner.
   */
  addListener( channel, listener ) {
    if( this._listners[ channel ] === undefined ) {
      this._listners[ channel ] = [];
    }

    this._listners[ channel ].push( listener );
  }

  /**
   * Removes a listener from the listener array for the specified IPC channel.
   *
   * @param {String}   channel  IPC channel. Specify the value defined in IPCKeys.
   * @param {Function} listener Channel listner.
   */
  removeListener( channel, listener  ) {
    if( this._listners[ channel ] === undefined ) { return; }

    const listeners = this._listners[ channel ];
    this._listners[ channel ] = listeners.filter( ( f ) => {
      return ( f !== listener );
    } );
  }

  /**
   * Occurs when a show message dialog has been finished.
   *
   * @param {Number} button Selected button number ( 0 - N ).
   */
  _onFinishShowMessage( button ) {
    const listners = this._listners[ IPCKeys.FinishShowMessage ];
    if( !( listners ) ) { return; }

    listners.forEach( ( listner ) => {
      listner( button );
    } );
  }

  /**
   * Occurs when a show open file/folder dialog has been finished.
   *
   * @param {Array} paths File or folder paths..
   */
  _onFinishShowOpenDialog( paths ) {
    const listners = this._listners[ IPCKeys.FinishShowOpenDialog ];
    if( !( listners ) ) { return; }

    listners.forEach( ( listner ) => {
      listner( paths );
    } );
  }

  /**
   * Occurs when a music file of read metadata has been finished.
   *
   * @param {Error}  err   Error information. Success is undefined.
   * @param {Object} music Music metadata.
   */
  _onFinishReadMusicMetadata( err, music ) {
    const listners = this._listners[ IPCKeys.FinishReadMusicMetadata ];
    if( !( listners ) ) { return; }

    listners.forEach( ( listner ) => {
      listner( err, music );
    } );
  }

  /**
   * Occurs when a get save image directory has been finished.
   *
   * @param {String} path Directory path.
   */
  _onFinishGetSaveImageDir( path ) {
    const listners = this._listners[ IPCKeys.FinishGetSaveImageDir ];
    if( !( listners ) ) { return; }

    listners.forEach( ( listner ) => {
      listner( path );
    } );
  }
}
