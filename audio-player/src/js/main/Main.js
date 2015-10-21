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
    this.mainWindow  = null;

    /**
     * Path of the folder in which to save the image.
     * @type {String}
     */
    this.saveImageDirPath = Path.join( App.getPath( 'userData' ), 'images' );

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

    this._ipc = new MainIPC( this );

    this.mainWindow = new BrowserWindow( {
      'width': 800,
      'min-width': 800,
      'height': 600,
      'min-height': 480,
      'resizable': true
    } );

    const filePath = Path.join( __dirname, 'index.html' );
    this.mainWindow.loadUrl( 'file://' + filePath );

    this.mainWindow.on( 'closed', () => {
      this.mainWindow = null;
    } );

    const menu = Menu.buildFromTemplate( MainMenu.menu( this.mainWindow ) );
    Menu.setApplicationMenu( menu );
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
App.on( 'ready', () => {
  main.onReady();
}  );

App.on( 'window-all-closed', () => {
  main.onWindowAllClosed();
} );
