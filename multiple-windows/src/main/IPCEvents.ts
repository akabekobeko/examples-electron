import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IPCKey } from '../common/Constants'
import { createNewWindow, getWindowIds, sendMessage } from './WindowManager'

/**
 * Occurs when create window is requested.
 * @param ev Event data.
 */
const onCreateNewWindow = (ev: IpcMainInvokeEvent) => {
  createNewWindow()
}

/**
 * Occurs when send message to other windows is requested.
 * @param ev Event data.
 * @param targetWindowId The identifier of target window.
 * @param message Message to be sent
 */
const onSendMessage = (
  ev: IpcMainInvokeEvent,
  targetWindowId: number,
  message: string
) => {
  ev.sender.send(IPCKey.SendMessage, sendMessage(targetWindowId, message))
}

/**
 * Occurs when get window identifiers is requested.
 * @param ev Event data.
 */
const onGetWindowIds = (ev: IpcMainInvokeEvent) => {
  return getWindowIds()
}

/**
 * A value indicating that an IPC events has been initialized.
 */
let initialized = false

/**
 * Initialize IPC events.
 */
export const initializeIpcEvents = () => {
  if (initialized) {
    return
  }
  initialized = true

  ipcMain.handle(IPCKey.CreateNewWindow, onCreateNewWindow)
  ipcMain.handle(IPCKey.SendMessage, onSendMessage)
  ipcMain.handle(IPCKey.GetWindowIds, onGetWindowIds)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.CreateNewWindow)
    ipcMain.removeAllListeners(IPCKey.SendMessage)
    ipcMain.removeAllListeners(IPCKey.GetWindowIds)
  }

  initialized = false
}
