import { BrowserWindow } from 'electron'
import path from 'path'

/** Type of window. */
enum WindowTypes {
  MainWindow = 1,
  GraphicEqualizer = 2
}

/** Current windows. */
const currentWindows: Map<WindowTypes, BrowserWindow> = new Map()

/**
 * Create a graphic equalizer window.
 */
const createGraphicEqualizerWindow = () => {
  if (currentWindows.get(WindowTypes.GraphicEqualizer)) {
    return
  }

  let newWindow = null
  if (process.platform === 'darwin') {
    newWindow = new BrowserWindow({
      width: 370,
      height: 300,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  } else {
    // Add a height for menu bar
    newWindow = new BrowserWindow({
      width: 370,
      height: 320,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    newWindow.on('close', () => {
      currentWindows.delete(WindowTypes.GraphicEqualizer)
    })

    newWindow.setMenu(null)
  }

  newWindow.on('closed', () => {
    /// #if env == 'DEBUG'
    console.log('The graphic equalizer window was closed.')
    /// #endif

    currentWindows.delete(WindowTypes.GraphicEqualizer)
  })

  newWindow.loadFile('assets/effect-geq.html')
  currentWindows.set(WindowTypes.GraphicEqualizer, newWindow)
}

/**
 * Create a main window.
 */
export const createMainWindow = () => {
  if (currentWindows.get(WindowTypes.MainWindow)) {
    return
  }

  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  newWindow.on('closed', () => {
    /// #if env == 'DEBUG'
    console.log('The main window was closed.')
    /// #endif

    const eq = currentWindows.get(WindowTypes.GraphicEqualizer)
    if (eq) {
      eq.close()
    }

    currentWindows.delete(WindowTypes.MainWindow)
  })

  newWindow.loadFile('assets/index.html')
  currentWindows.set(WindowTypes.MainWindow, newWindow)
}

/**
 * Toggle visible/hidden of graphic equalizer window.
 * If the window does not exist, it will be created newly.
 */
export const toggleShowGraphicEqualizerWindow = () => {
  const eqWindow = currentWindows.get(WindowTypes.GraphicEqualizer)
  if (eqWindow) {
    if (eqWindow.isVisible()) {
      eqWindow.hide()
    } else {
      eqWindow.show()
    }
  } else {
    createGraphicEqualizerWindow()
  }
}

/**
 * Get an instance of main window.
 * @returns instance.
 */
export const getMainWindow = (): BrowserWindow | undefined => {
  return currentWindows.get(WindowTypes.MainWindow)
}
