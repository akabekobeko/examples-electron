import {
  dialog,
  BrowserWindow,
  ipcMain,
  OpenDialogOptions,
  IpcMessageEvent,
  MessageBoxOptions,
  SaveDialogOptions
} from 'electron'
import { IPCKey } from '../common/Constants'
import { createNewWindow, getWindowIds, sendMessege } from './WindowManager'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onRequestShowOpenDialog = (
  ev: IpcMessageEvent,
  options: OpenDialogOptions
) => {
  const paths = dialog.showOpenDialog(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
  ev.sender.send(IPCKey.FinishShowOpenDialog, paths)
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onRequestShowSaveDialog = (
  ev: IpcMessageEvent,
  options: SaveDialogOptions
) => {
  const path = dialog.showSaveDialog(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
  ev.sender.send(IPCKey.FinishShowSaveDialog, path)
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onRequestShowMessageBox = (
  ev: IpcMessageEvent,
  options: MessageBoxOptions
) => {
  const button = dialog.showMessageBox(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
  ev.sender.send(IPCKey.FinishShowMessageBox, button)
}

/**
 * Occurs when create window is requested.
 * @param ev Event data.
 */
const onRequestCreateNewWindow = (ev: IpcMessageEvent) => {
  createNewWindow()
}

/**
 * Occurs when send message to other windows is requested.
 * @param ev Event data.
 * @param targetWindowId The identifier of target window.
 * @param message Message to be sent
 */
const onRequestSendMessage = (
  ev: IpcMessageEvent,
  targetWindowId: number,
  message: string
) => {
  ev.sender.send(IPCKey.FinishSendMessage, sendMessege(targetWindowId, message))
}

/**
 * Occurs when get window identifiers is requested.
 * @param ev Event data.
 */
const onRequestGetWindowIds = (ev: IpcMessageEvent) => {
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

  ipcMain.on(IPCKey.RequestShowOpenDialog, onRequestShowOpenDialog)
  ipcMain.on(IPCKey.RequestShowSaveDialog, onRequestShowSaveDialog)
  ipcMain.on(IPCKey.RequestShowMessageBox, onRequestShowMessageBox)

  ipcMain.on(IPCKey.RequestCreateNewWindow, onRequestCreateNewWindow)
  ipcMain.on(IPCKey.RequestSendMessage, onRequestSendMessage)
  ipcMain.on(IPCKey.RequestGetWindowIds, onRequestGetWindowIds)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)

    ipcMain.removeAllListeners(IPCKey.RequestCreateNewWindow)
    ipcMain.removeAllListeners(IPCKey.RequestSendMessage)
    ipcMain.removeAllListeners(IPCKey.RequestGetWindowIds)
  }

  initialized = false
}
