import { BrowserWindow } from 'electron'

/**
 * Type of window.
 */
enum WindowTypes {
  MainWindow = 1,
  GraphicEqualizer = 2
}

/**
 * Current windows.
 */
const currentWindows: Map<WindowTypes, BrowserWindow> = new Map()

/**
 * Create a main window.
 */
export const CreateMainWindow = () => {
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
      nodeIntegration: true
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
 * Create a graphic equalizer window.
 */
const createGraphicEqualizerWindow = () => {
  if (currentWindows.get(WindowTypes.GraphicEqualizer)) {
    return
  }

  let newWindow = null
  if (process.platform === 'darwin') {
    newWindow = new Electron.BrowserWindow({
      width: 370,
      height: 300,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
  } else {
    // Add a heigth for menu bar
    newWindow = new Electron.BrowserWindow({
      width: 370,
      height: 320,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true
      }
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
 * Toggle visible/hidden of graphic equalizer window.
 * If the window does not exist, it will be created newly.
 */
export const ToggleShowGraphicEqualizerWindow = () => {
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
export const GetMainWindow = (): BrowserWindow | undefined => {
  return currentWindows.get(WindowTypes.MainWindow)
}
