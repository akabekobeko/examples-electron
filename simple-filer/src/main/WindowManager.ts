import { BrowserWindow } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null

/**
 * Create a main window of application.
 */
export const createMainWindow = () => {
  if (mainWindow) {
    return
  }

  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      nativeWindowOpen: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  window.on('closed', () => {
    mainWindow = null
  })

  window.loadFile('assets/index.html')
}
