import { app, Menu } from 'electron'
import { initializeIpcEvents, releaseIpcEvents } from './IPCEvents'
import { mainMenu } from './MainMenu'
import { createMainWindow } from './WindowManager'
import { setImageSaveDir } from './MusicMetadataReader'
import Path from 'path'

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application')
  /// #endif

  createMainWindow()
  Menu.setApplicationMenu(mainMenu)
  setImageSaveDir(Path.join(app.getPath('userData'), 'images'))

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
