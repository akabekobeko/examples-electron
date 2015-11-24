import Path          from 'path';
import BrowserWindow from 'browser-window';
import Util          from '../common/Util.js';
import { IPCKeys }   from '../common/Constants.js';

/**
 * Define the type of window.
 * @type {Object}
 */
export const WindowTypes = {
  Main:             'main',
  GraphicEqualizer: 'graphicEqualizer'
};

/**
 * Manage the window.
 */
export default class WindowManager {
  /**
   * Initialize instance.
   *
   * @param {Main} context Application context.
   */
  constructor( context ) {
    /**
     * Collection of a managed window.
     * @type {Map}
     */
    this._windows = new Map();

    // IPC handlers
    context.ipc.on( IPCKeys.RequestUpdateGraphicEqualizer, this._onRequestUpdateGraphicEqualizer.bind( this ) );
    context.ipc.on( IPCKeys.FinishUpdateGraphicEqualizer, this._onFinishUpdateGraphicEqualizer.bind( this ) );
  }

  /**
   * Get the window from key.
   *
   * @param {WindowTypes} type Window type.
   *
   * @return {BrowserWindow} Successful if window instance, otherwise undefined.
   */
  getWindow( type ) {
    return this._windows.get( type );
  }

  /**
   * Close a window.
   *
   * @param {WindowTypes} type Window type.
   */
  close( type ) {
    const w = this._windows.get( type );
    if( !( w ) ) { return; }

    w.close();
  }

  /**
   * Show a window.
   *
   * @param {WindowTypes} type Window type.
   */
  show( type ) {
    switch( type ) {
      case WindowTypes.Main:
        this._showMain();
        break;

      case WindowTypes.GraphicEqualizer:
        this._showGraphicEqualizer();
        break;

      default:
        break;
    }
  }

  /**
   * Switch the window display, Show or hide.
   *
   * @param {WindowTypes} type Window type.
   */
  toggle( type ) {
    // Main window is always showing
    if( type === WindowTypes.Main ) { return; }

    const w = this._windows.get( type );
    if( w ) {
      if( w.isVisible() ) {
        w.hide();
      } else {
        w.show();
      }
    } else {
      this.show( type );
    }
  }

  /**
   * Reload the focused window, For debug.
   */
  reload() {
    const w = BrowserWindow.getFocusedWindow();
    if( w ) {
      w.reload();
    }
  }

  /**
   * Switch the display of the developer tools window at focused window, For debug.
   */
  toggleDevTools() {
    const w = BrowserWindow.getFocusedWindow();
    if( w ) {
      w.toggleDevTools();
    }
  }

  /**
   * Show the main window.
   */
  _showMain() {
    if( this._windows.get( WindowTypes.Main ) ) { return; }

    const w = new BrowserWindow( {
      'width': 800,
      'height': 600,
      'min-width': 800,
      'min-height': 480,
      'resizable': true
    } );

    w.on( 'closed', () => {
      if( DEBUG ) { Util.log( 'The main window was closed.' ); }

      // Close an other windows
      this._windows.forEach( ( value, key ) => {
        if( key === WindowTypes.Main ) { return; }

        value.close();
      } );

      this._windows.delete( WindowTypes.Main );
    } );

    const filePath = Path.join( __dirname, 'window-main.html' );
    w.loadURL( 'file://' + filePath );

    this._windows.set( WindowTypes.Main, w );
  }

  /**
   * Show the graphic equalizer window.
   */
  _showGraphicEqualizer() {
    if( this._windows.get( WindowTypes.GraphicEqualizer ) ) { return; }

    let w = null;
    if( process.platform === 'darwin' ) {
      w = new BrowserWindow( {
        'width': 360,
        'height': 300,
        'resizable': false,
        'alwaysOnTop': true
      } );

    } else {
      // Add a heigth for menu bar
      w = new BrowserWindow( {
        'width': 380,
        'height': 340,
        'resizable': false,
        'alwaysOnTop': true
      } );
    }

    w.on( 'closed', () => {
      if( DEBUG ) { Util.log( 'The graphic equalizer window was closed.' ); }

      this._windows.delete( WindowTypes.GraphicEqualizer );
    } );

    const filePath = Path.join( __dirname, 'window-effect-geq.html' );
    w.loadURL( 'file://' + filePath );

    this._windows.set( WindowTypes.GraphicEqualizer, w );
  }

  /**
   * Occurs when the graphic equalizer update is requested.
   *
   * @param {IPCEvent}       ev      Event data.
   * @param {Boolean}        connect If true to connect the effector, Otherwise disconnect.
   * @param {Array.<Number>} gains   Gain values.
   */
  _onRequestUpdateGraphicEqualizer( ev, connect, gains ) {
    const w = this._windows.get( WindowTypes.Main );
    if( !( w ) ) { return; }

    w.webContents.send( IPCKeys.RequestUpdateGraphicEqualizer, connect, gains );
    ev.sender.send( IPCKeys.FinishUpdateGraphicEqualizer );
  }

  /**
   * Occurs when the graphic equalizer update is finished.
   */
  _onFinishUpdateGraphicEqualizer() {
    const w = this._windows.get( WindowTypes.GraphicEqualizer );
    if( !( w ) ) { return; }

    w.webContents.send( IPCKeys.FinishUpdateGraphicEqualizer );
  }
}
