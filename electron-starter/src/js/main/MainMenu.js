import App from 'app';

/**
 * Main menu.
 */
export default class MainMenu {
  /**
   * Create menu.
   *
   * @param {BrowserWindow} appWindow Main window.
   *
   * @return {Array.<Object>} Menu.
   */
  static menu( appWindow ) {
    switch( process.platform ) {
      case 'darwin':
        return MainMenu._menuOSX( appWindow );

      default:
        return MainMenu._menuDefault( appWindow );
    }
  }

  /**
   * Create menu for OS X.
   *
   * @param {BrowserWindow} appWindow Main window.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuOSX( appWindow ) {
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
              appWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click() {
              appWindow.toggleDevTools();
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
   * @param {BrowserWindow} appWindow Main window.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuDefault( appWindow ) {
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
              appWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              appWindow.toggleDevTools();
            }
          }
        ]
      } );
    }

    return menu;
  }
}
