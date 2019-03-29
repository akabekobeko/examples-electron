import { BrowserWindow } from 'electron'
import Path from 'path'
import { IPCKey } from '../common/Constants'

/**
 * Current window list.
 */
const currentWindows: Map<number, BrowserWindow> = new Map()

/**
 * Notify that the window ID list has been updated.
 * @param excludeId Window identifier to exclude from notification target.
 */
const notifyUpdateWindowIDs = (excludeId: number) => {
  const windowIds = Array.from(currentWindows.keys())
  currentWindows.forEach((w) => {
    if (w.id === excludeId) {
      return
    }

    w.webContents.send(IPCKey.UpdateWindowIds, windowIds)
  })
}

/**
 * Create a window and add it to the list.
 */
export const createNewWindow = () => {
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

  const windowId = newWindow.id
  newWindow.on('closed', () => {
    /// #if env == 'DEBUG'
    console.log(`Window was closed, id = ${windowId}`)
    /// #endif

    currentWindows.delete(windowId)
    notifyUpdateWindowIDs(windowId)
  })

  // The window identifier can be checked from the Renderer side.
  // `win.loadFile` will escape `#` to `%23`, So use `win.loadURL`
  const filePath = Path.join(__dirname, 'index.html')
  newWindow.loadURL(`file://${filePath}#${windowId}`)

  currentWindows.set(windowId, newWindow)
  notifyUpdateWindowIDs(windowId)
}

/**
 * Send message to other windows.
 * @param targetWindowId The identifier of target window.
 * @param message Message to be sent
 * @returns `true` on success. `false` if the target window can't be found.
 */
export const sendMessege = (
  targetWindowId: number,
  message: string
): boolean => {
  const w = currentWindows.get(targetWindowId)
  if (w) {
    w.webContents.send(IPCKey.UpdateMessage, message)
    return true
  }

  return false
}

/**
 * Get a current window identifiers.
 */
export const getWindowIds = (): number[] => {
  return Array.from(currentWindows.keys())
}
