import { app, BrowserWindow, Menu } from 'electron'
import { InitializeIpcEvents, ReleaseIpcEvents } from './IPCEvents'
import { MainMenu } from './MainMenu'
import { CreateMainWindow } from './WindowManager'
import { SetImageSaveDir } from './MusicMetadataReader'
import Path from 'path'

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application')
  /// #endif

  CreateMainWindow()
  Menu.setApplicationMenu(MainMenu)
  SetImageSaveDir(Path.join(app.getPath('userData'), 'images'))

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
