import App           from 'app';
import CrashReporter from 'crash-reporter';
import BrowserWindow from 'browser-window';
import Menu          from 'menu';
import Path          from 'path';
import MainMenu      from './MainMenu.js';

CrashReporter.start();

/**
 * アプリケーションのメイン ウィンドウ。
 * @type {BrowserWindow}
 */
let mainWindow = null;

App.on( 'ready', () => {
  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    resizable: true
  } );

  const filePath = Path.join( __dirname, 'index.html' );
  mainWindow.loadUrl( 'file://' + filePath );

  mainWindow.on( 'closed', () => {
    mainWindow = null;
  } );

  const menu = Menu.buildFromTemplate( MainMenu.menu( mainWindow ) );
  Menu.setApplicationMenu( menu );
} );

App.on( 'window-all-closed', () => {
  App.quit();
} );
