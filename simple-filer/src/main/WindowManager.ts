import { BrowserWindow } from 'electron'

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
      nodeIntegration: true
    }
  })

  window.on('closed', () => {
    mainWindow = null
  })

  window.loadFile('assets/index.html')
}
