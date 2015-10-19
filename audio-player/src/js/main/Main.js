import App           from 'app';
import CrashReporter from 'crash-reporter';
import BrowserWindow from 'browser-window';
import Menu          from 'menu';
import Path          from 'path';
import MainMenu      from './MainMenu.js';
import MainIPC       from './MainIPC.js';
import Util          from '../common/Util.js';

/**
 * Application entry point.
 */
class Main {
  /**
   * Initialize instance.
   */
  constructor() {
    /**
     * Application main window.
     * @type {BrowserWindow}
     */
    this._mainWindow  = null;

    /**
     * Manage the IPC of the main process.
     * @type {MainIPC}
     */
    this._ipc = null;

    // Compile switch
    global.DEBUG = true;
  }

  /**
   * Occurs when a application launched.
   */
  onReady() {
    if( DEBUG ) { Util.log( 'Launched' ); }

    this._mainWindow = new BrowserWindow( {
      'width': 800,
      'min-width': 800,
      'height': 600,
      'min-height': 480,
      'resizable': true
    } );

    const filePath = Path.join( __dirname, 'index.html' );
    this._mainWindow.loadUrl( 'file://' + filePath );

    this._mainWindow.on( 'closed', () => {
      this._mainWindow = null;
    } );

    const menu = Menu.buildFromTemplate( MainMenu.menu( this._mainWindow ) );
    Menu.setApplicationMenu( menu );

    this._ipc = new MainIPC( this._mainWindow );
  }

  /**
   * Occurs when a window all closed.
   */
  onWindowAllClosed() {
    if( DEBUG ) { Util.log( 'Quit' ); }

    App.quit();
  }
}

CrashReporter.start();

const main = new Main();
App.on( 'ready',             main.onReady           );
App.on( 'window-all-closed', main.onWindowAllClosed );
