import {
  dialog,
  BrowserWindow,
  ipcMain,
  shell,
  OpenDialogOptions,
  IpcMessageEvent,
  MessageBoxOptions,
  SaveDialogOptions
} from 'electron'
import Path from 'path'
import { IPCKey } from '../common/Constatnts'

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
 *Occurs in a request to open URL in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 */
const onRequestShowURL = (ev: IpcMessageEvent, url: string) => {
  const succeeded = shell.openExternal(url)
  ev.sender.send(IPCKey.FinishShowURL, succeeded)
}

/**
 * A value indicating that an IPC events has been initialized.
 */
let initialized = false

/**
 * Initialize IPC events.
 */
export const InitializeIpcEvents = () => {
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
export const ReleaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestShowURL)
  }

  initialized = false
}
