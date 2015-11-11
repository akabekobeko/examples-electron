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
    const templates = [
      { label: 'App', submenu: [
        { label: 'Quit', command: 'application:quit' }
      ] },
      { label: 'Effector', submenu: [
        { label: 'Graphic Equalizer', command: 'effector:graphic-equalizer' }
      ] }
    ];

    if( DEBUG ) {
      templates.push( {
        label: 'Debug', submenu: [
          { label: 'Reload', command: 'debug:reload' },
          { label: 'Developer Tools', command: 'debug:dev-tools' }
        ]
      } );
    }

    const keymaps  = MainMenu._keymaps();
    const handlers = MainMenu._handlers( context );

    const menu = templates.map( ( template ) => {
      return {
        label:   template.label,
        submenu: template.submenu.map( ( item ) => {
          return {
            label: item.label,
            accelerator: keymaps[ item.command ],
            click: handlers[ item.command ]
          }
        } )
      }
    } );

    return menu;
  }

  /**
   * Get the keyboard shortcuts maps for OS X.
   *
   * @return {Object} Success is key maps ( Key/Value pare ).
   */
  static _keymaps() {
    switch( process.platform ) {
      case 'darwin':
        return {
          'application:quit': 'command+q',

          'debug:reload':    'command+r',
          'debug:dev-tools': 'command+alt+i'
        };

      case 'win32':
        return {
          'application:quit': 'alt+f4',

          'debug:reload':    'ctrl+r',
          'debug:dev-tools': 'ctrl+alt+i'
        };

      // Otherwise Linux
      default:
        return {
          'application:quit': 'ctrl+q',

          'debug:reload':    'ctrl+r',
          'debug:dev-tools': 'ctrl+alt+i'
        };
    }
  }

  /**
   * Get the handler functions when the menu item is clicked.
   *
   * @param {Main} context Application instance.
   *
   * @return {Object} Menu handler functions ( Key/Value pare ).
   */
  static _handlers( context ) {
    return {
      'application:quit': () => { App.quit(); },

      'effector:graphic-equalizer': () => { context.windowManager.toggleGraphicEqualizer(); },

      'debug:reload':    () => { context.windowManager.reload(); },
      'debug:dev-tools': () => { context.windowManager.toggleDevTools(); }
    }
  }
}
