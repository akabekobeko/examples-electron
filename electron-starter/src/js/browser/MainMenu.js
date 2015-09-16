import App from 'app';

/**
 * アプリケーションのメイン メニューです。
 */
export default class MainMenu {
  /**
   * メニューを取得します。
   *
   * @param {BrowserWindow} appWindow アプリケーションのメイン ウィンドウ。
   *
   * @return {Array.<Object>} メニュー情報コレクション。
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
   * メニューを取得します。
   *
   * @param {BrowserWindow} appWindow アプリケーションのメイン ウィンドウ。
   *
   * @return {Array.<Object>} メニュー情報コレクション。
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
        label: 'View',
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
   * メニューを取得します。
   *
   * @param {BrowserWindow} appWindow アプリケーションのメイン ウィンドウ。
   *
   * @return {Array.<Object>} メニュー情報コレクション。
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
        label: 'View',
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
