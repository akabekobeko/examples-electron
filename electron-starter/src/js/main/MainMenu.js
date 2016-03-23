import App from 'app';
import Shell from 'shell';

const AppName = 'Electron Starter Kit';
const HelpURL = 'https://github.com/akabekobeko/examples-electron';

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
    const templates = [
      MainMenu._menuView(),
      MainMenu._menuWindow(),
      MainMenu._menuHelp()
    ];

    if( process.platform === 'darwin' ) {
      templates.unshift( MainMenu._menuApp( context ) );
    }

    return templates;
  }

  /**
   * Create a menu of Application ( OS X only ).
   *
   * @return {Object} Menu data.
   */
  static _menuApp( context ) {
    return {
      label: AppName,
      submenu: [
        {
          label: 'About ' + AppName,
          click: () => {
            context.windowManager.createAboutWindow();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + AppName,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => { App.quit(); }
        },
      ]
    };
  }

  /**
   * Create a menu of View.
   *
   * @return {Object} Menu data.
   */
  static _menuView() {
    const templates = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: ( () => {
            return ( process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11' );
          } )(),
          click: ( item, focusedWindow ) => {
            if( focusedWindow ) {
              focusedWindow.setFullScreen( !( focusedWindow.isFullScreen() ) );
            }
          }
        }
      ]
    };

    if( DEBUG ) {
      templates.submenu.unshift( {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: ( item, focusedWindow ) => {
          if( focusedWindow ) {
            focusedWindow.reload();
          }
        }
      } );

      templates.submenu.push( {
        label: 'Toggle Developer Tools',
        accelerator: ( () => {
          return ( process.platform === 'darwin' ? 'Alt+Command+I' :  'Ctrl+Shift+I' );
        } )(),
        click: ( item, focusedWindow ) => {
          if( focusedWindow ) {
            focusedWindow.toggleDevTools();
          }
        }
      } );
    }

    return templates;
  }

  /**
   * Create a menu of Window.
   *
   * @return {Object} Menu data.
   */
  static _menuWindow() {
    const templates = {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    };

    if( process.platform === 'darwin' ) {
      templates.submenu.push( {
        type: 'separator'
      } );

      templates.submenu.push( {
        label: 'Bring All to Front',
        role: 'front'
      } );
    }

    return templates;
  }

  /**
   * Create a menu of Help.
   *
   * @return {Object} Menu data.
   */
  static _menuHelp() {
    return {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            Shell.openExternal( HelpURL );
          }
        }
      ]
    };
  }
}
