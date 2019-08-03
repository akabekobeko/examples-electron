import {
  BrowserWindow,
  dialog,
  shell,
  ipcMain,
  IpcMainEvent,
  OpenDialogOptions,
  MessageBoxOptions,
  SaveDialogOptions
} from 'electron'
import { IPCKey } from '../common/Constants'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onRequestShowOpenDialog = (
  ev: IpcMainEvent,
  options: OpenDialogOptions
) => {
  dialog
    .showOpenDialog(BrowserWindow.fromWebContents(ev.sender), options)
    .then((result) => ev.sender.send(IPCKey.FinishShowOpenDialog, null, result))
    .catch((err) => ev.sender.send(IPCKey.FinishShowOpenDialog, err))
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onRequestShowSaveDialog = (
  ev: IpcMainEvent,
  options: SaveDialogOptions
) => {
  dialog
    .showSaveDialog(BrowserWindow.fromWebContents(ev.sender), options)
    .then((result) => ev.sender.send(IPCKey.FinishShowSaveDialog, null, result))
    .catch((err) => ev.sender.send(IPCKey.FinishShowSaveDialog, err))
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onRequestShowMessageBox = (
  ev: IpcMainEvent,
  options: MessageBoxOptions
) => {
  dialog
    .showMessageBox(BrowserWindow.fromWebContents(ev.sender), options)
    .then((result) => ev.sender.send(IPCKey.FinishShowMessageBox, null, result))
    .catch((err) => ev.sender.send(IPCKey.FinishShowMessageBox, err))
}

/**
 * Occurs in a request to open URL in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 */
const onRequestShowURL = (ev: IpcMainEvent, url: string) => {
  shell
    .openExternal(url)
    .then(() => ev.sender.send(IPCKey.FinishShowURL, null))
    .catch((err) => ev.sender.send(IPCKey.FinishShowURL, err))
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

  ipcMain.on(IPCKey.RequestShowOpenDialog, onRequestShowOpenDialog)
  ipcMain.on(IPCKey.RequestShowSaveDialog, onRequestShowSaveDialog)
  ipcMain.on(IPCKey.RequestShowMessageBox, onRequestShowMessageBox)
  ipcMain.on(IPCKey.RequestShowURL, onRequestShowURL)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestShowURL)
  }

  initialized = false
}
