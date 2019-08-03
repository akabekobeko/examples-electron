import { ipcMain, IpcMainEvent } from 'electron'
import { IPCKey } from '../common/Constants'
import { createNewWindow, getWindowIds, sendMessege } from './WindowManager'

/**
 * Occurs when create window is requested.
 * @param ev Event data.
 */
const onRequestCreateNewWindow = (ev: IpcMainEvent) => {
  createNewWindow()
}

/**
 * Occurs when send message to other windows is requested.
 * @param ev Event data.
 * @param targetWindowId The identifier of target window.
 * @param message Message to be sent
 */
const onRequestSendMessage = (
  ev: IpcMainEvent,
  targetWindowId: number,
  message: string
) => {
  ev.sender.send(IPCKey.FinishSendMessage, sendMessege(targetWindowId, message))
}

/**
 * Occurs when get window identifiers is requested.
 * @param ev Event data.
 */
const onRequestGetWindowIds = (ev: IpcMainEvent) => {
  ev.sender.send(IPCKey.UpdateWindowIds, getWindowIds())
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

  ipcMain.on(IPCKey.RequestCreateNewWindow, onRequestCreateNewWindow)
  ipcMain.on(IPCKey.RequestSendMessage, onRequestSendMessage)
  ipcMain.on(IPCKey.RequestGetWindowIds, onRequestGetWindowIds)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestCreateNewWindow)
    ipcMain.removeAllListeners(IPCKey.RequestSendMessage)
    ipcMain.removeAllListeners(IPCKey.RequestGetWindowIds)
  }

  initialized = false
}
