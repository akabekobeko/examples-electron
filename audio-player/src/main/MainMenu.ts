import { app, Menu, MenuItemConstructorOptions } from 'electron'

/**
 * Create a template for the menu.
 * @returns Template.
 */
const createTemplate = (): MenuItemConstructorOptions[] => {
  const isMac = process.platform === 'darwin'
  return [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }
        ]
      : []),
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
        ...(isMac
          ? [
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
              }
            ]
          : [])
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        /// #if env == 'DEBUG'
        { role: 'toggledevtools' },
        /// #endif
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        ...(isMac
          ? [
              { role: 'close' },
              { role: 'minimize' },
              { role: 'zoom' },
              { type: 'separator' },
              { role: 'front' }
            ]
          : [{ role: 'minimize' }, { role: 'close' }])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            require('electron').shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ] as MenuItemConstructorOptions[]
}

/**
 * Create and set main menu.
 */
export const createMainMenu = () => {
  const template = Menu.buildFromTemplate(createTemplate())
  Menu.setApplicationMenu(template)
}

export default createMainMenu
