import App           from 'app';
import Menu          from 'menu';
import Path          from 'path';
import Util          from '../common/Util.js';
import MainMenu      from './MainMenu.js';
import MainIPC       from './MainIPC.js';
import WindowManager from './WindowManager.js';

/**
 * Application entry point.
 */
class Main {
  /**
   * Initialize instance.
   */
  constructor() {
    /**
     * Manage the window.
     * @type {WindowManager}
     */
    this._windowManager = new WindowManager();

    /**
     * Path of the folder in which to save the image.
     * @type {String}
     */
    this._saveImageDirPath = Path.join( App.getPath( 'userData' ), 'images' );

    /**
     * Manage the IPC of the main process.
     * @type {MainIPC}
     */
    this._ipc = null;

    // Compile switch
    global.DEBUG = true;
  }

  /**
   * Get the window manager.
   *
   * @return {WindowManager} Instance of the window manager.
   */
  get windowManager() {
    return this._windowManager;
  }

  /**
   * Get the path of the folder in which to save the image.
   *
   * @return {String} path string.
   */
  get saveImageDirPath() {
    return this._saveImageDirPath;
  }

  /**
   * Occurs when a application launched.
   */
  onReady() {
    if( DEBUG ) { Util.log( 'Launched' ); }

    this._ipc = new MainIPC( this );

    this._windowManager.setup();

    const menu = Menu.buildFromTemplate( MainMenu.menu( this ) );
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

const main = new Main();
App.on( 'ready', () => {
  main.onReady();
}  );

App.on( 'window-all-closed', () => {
  if( DEBUG ) { Util.log( 'All of the window was closed.' ); }

  main.onWindowAllClosed();
} );
