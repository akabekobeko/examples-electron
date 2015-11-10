import App from 'app';

/**
 * Main menu.
 */
export default class MainMenu {
  /**
   * Create menu.
   *
   * @param {App} app Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static menu( app ) {
    switch( process.platform ) {
      case 'darwin':
        return MainMenu._menuOSX( app );

      default:
        return MainMenu._menuDefault( app );
    }
  }

  /**
   * Create menu for OS X.
   *
   * @param {App} app Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuOSX( app ) {
    const menu = [
      {
        label: 'App',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              App.quit();
            }
          }
        ]
      }
    ];

    if( DEBUG ) {
      menu.push( {
        label: 'Debug',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click() {
              app.windowManager.mainWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click() {
              app.windowManager.mainWindow.toggleDevTools();
            }
          }
        ]
      } );
    }

    return menu;
  }

  /**
   * Create menu for default platform.
   *
   * @param {App} app Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuDefault( app ) {
    const menu = [
      {
        label: 'App',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Alt+F4',
            click() {
              App.quit();
            }
          }
        ]
      }
    ];

    if( DEBUG ) {
      menu.push( {
        label: 'Debug',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Ctrl+R',
            click() {
              app.windowManager.mainWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              app.windowManager.mainWindow.toggleDevTools();
            }
          }
        ]
      } );
    }

    return menu;
  }
}
