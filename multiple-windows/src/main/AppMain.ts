import { app, Menu } from 'electron'
import { initializeIpcEvents, releaseIpcEvents } from './IPCEvents'
import { createMainMenu } from './MainMenu'
import { createNewWindow } from './WindowManager'

app.name = 'MultipleWindows'

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application')
  /// #endif

  createNewWindow()
  createMainMenu()
  initializeIpcEvents()
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

  releaseIpcEvents()
  app.quit()
})
