import { app, BrowserWindow, Menu } from 'electron'
import { InitializeIpcEvents, ReleaseIpcEvents } from './IPCEvents'
import { MainMenu } from './MainMenu'

let mainWindow: BrowserWindow | null

const createMainWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile('assets/index.html')
  return window
}

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application')
  /// #endif

  mainWindow = createMainWindow()
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(MainMenu)

  InitializeIpcEvents()
})

/// #if env == 'DEBUG'
app.on('quit', () => {
  console.log('Application is quit')
})
/// #endif

app.on('window-all-closed', () => {
  /// #if env == 'DEBUG'
  console.log('All of the window was closed.')
  /// #endif

  ReleaseIpcEvents()
  app.quit()
})
