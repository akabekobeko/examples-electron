import { app, BrowserWindow } from 'electron'
import { InitializeIpcEvents, ReleaseIpcEvents } from './IPCEvents'

let mainWindow

const initializeMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('assets/index.html')
}

app.on('ready', () => {
  console.log('Initialize Application')
  InitializeIpcEvents()
  initializeMainWindow()
})

app.on('quit', () => {
  console.log('Application is quit')
})

app.on('window-all-closed', () => {
  console.log('All of the window was closed.')
  ReleaseIpcEvents()
  app.quit()
})

