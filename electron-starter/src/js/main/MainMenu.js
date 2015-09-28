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
    return [
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
      },
      {
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
      }
    ];
  }

  /**
   * Create menu for default platform.
   *
   * @param {BrowserWindow} appWindow Main window.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuDefault( appWindow ) {
    return [
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
      },
      {
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
      }
    ];
  }
}
