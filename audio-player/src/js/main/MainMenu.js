import App from 'app';

/**
 * Main menu.
 */
export default class MainMenu {
  /**
   * Create menu.
   *
   * @param {Main} context Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static menu( context ) {
    switch( process.platform ) {
      case 'darwin':
        return MainMenu._menuOSX( context );

      default:
        return MainMenu._menuDefault( context );
    }
  }

  /**
   * Create menu for OS X.
   *
   * @param {Main} context Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuOSX( context ) {
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
              context.windowManager.mainWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click() {
              context.windowManager.mainWindow.toggleDevTools();
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
   * @param {Main} context Application instance.
   *
   * @return {Array.<Object>} Menu.
   */
  static _menuDefault( context ) {
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
              context.windowManager.mainWindow.reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              context.windowManager.mainWindow.toggleDevTools();
            }
          }
        ]
      } );
    }

    return menu;
  }
}
