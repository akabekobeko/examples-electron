import {
  BrowserWindow,
  dialog,
  shell,
  ipcMain,
  OpenDialogOptions,
  MessageBoxOptions,
  SaveDialogOptions,
  IpcMainInvokeEvent
} from 'electron'
import { IPCKey } from '../common/Constants'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onShowOpenDialog = async (
  ev: IpcMainInvokeEvent,
  options: OpenDialogOptions
) => {
  const win = BrowserWindow.fromWebContents(ev.sender)
  if (win) {
    return dialog.showOpenDialog(win, options)
  } else {
    throw new Error('Message sender window does not exist')
  }
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onShowSaveDialog = async (
  ev: IpcMainInvokeEvent,
  options: SaveDialogOptions
) => {
  const win = BrowserWindow.fromWebContents(ev.sender)
  if (win) {
    return dialog.showSaveDialog(win, options)
  } else {
    throw new Error('Message sender window does not exist')
  }
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onShowMessageBox = async (
  ev: IpcMainInvokeEvent,
  options: MessageBoxOptions
) => {
  const win = BrowserWindow.fromWebContents(ev.sender)
  if (win) {
    return dialog.showMessageBox(win, options)
  } else {
    throw new Error('Message sender window does not exist')
  }
}

/**
 * Occurs in a request to open URL in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 */
const onShowURL = async (
  ev: IpcMainInvokeEvent,
  url: string
): Promise<void> => {
  return shell.openExternal(url)
}

/** A value indicating that an IPC events has been initialized. */
let initialized = false

/**
 * Initialize IPC events.
 */
export const initializeIpcEvents = () => {
  if (initialized) {
    return
  }
  initialized = true

  ipcMain.handle(IPCKey.ShowOpenDialog, onShowOpenDialog)
  ipcMain.handle(IPCKey.ShowSaveDialog, onShowSaveDialog)
  ipcMain.handle(IPCKey.ShowMessageBox, onShowMessageBox)
  ipcMain.handle(IPCKey.ShowURL, onShowURL)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.ShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.ShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.ShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.ShowURL)
  }

  initialized = false
}
