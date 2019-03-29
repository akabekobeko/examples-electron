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
import { IPCKey } from '../common/Constants'
import { FileItem } from '../common/Types'
import { enumFiles } from './FileManager'

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
 * Occurs when folder selection is requested.
 * @param ev Event data.
 */
const onRequestSelectFolder = (ev: IpcMessageEvent) => {
  const paths = dialog.showOpenDialog(
    BrowserWindow.fromWebContents(ev.sender),
    {
      title: 'Select root folder',
      properties: ['openDirectory']
    }
  )

  if (!paths || paths.length === 0) {
    ev.sender.send(IPCKey.FinishSelectFolder)
    return
  }

  let folderPath = paths[0]
  enumFiles(folderPath)
    .then((items: FileItem[]) => {
      ev.sender.send(
        IPCKey.FinishSelectFolder,
        Path.basename(folderPath),
        folderPath,
        items
      )
    })
    .catch(() => {
      ev.sender.send(IPCKey.FinishSelectFolder)
    })
}

/**
 * Occurs when an item enumeration in the folder is requested.
 * @param ev Event data.
 * @param options Path of the target folder.
 */
const onRequestEnumItems = (ev: IpcMessageEvent, folderPath?: string) => {
  enumFiles(folderPath)
    .then((items) => {
      ev.sender.send(IPCKey.FinishEnumItems, folderPath, items)
    })
    .catch(() => {
      ev.sender.send(IPCKey.FinishEnumItems, folderPath, [])
    })
}

/**
 *Occurs in a request to open a file or folder in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 */
const onRequestOpenItem = (ev: IpcMessageEvent, itemPath: string) => {
  const succeeded = shell.openItem(itemPath)
  ev.sender.send(IPCKey.FinishOpenItem, succeeded)
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
  ipcMain.on(IPCKey.RequestSelectFolder, onRequestSelectFolder)
  ipcMain.on(IPCKey.RequestEnumItems, onRequestEnumItems)
  ipcMain.on(IPCKey.RequestOepnItem, onRequestOpenItem)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestSelectFolder)
    ipcMain.removeAllListeners(IPCKey.RequestEnumItems)
    ipcMain.removeAllListeners(IPCKey.RequestOepnItem)
  }

  initialized = false
}
