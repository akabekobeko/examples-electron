import { dialog, BrowserWindow, ipcMain, OpenDialogOptions, IpcMessageEvent, MessageBoxOptions, SaveDialogOptions } from 'electron'
import { IPCKey } from '../common/Constants'
import { FileItem } from '../common/TypeAliases';
import { GetFileInfo, EnumFiles } from './FileManager'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onRequestShowOpenDialog = (ev: IpcMessageEvent, options: OpenDialogOptions) => {
  const paths = dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender), options)
  ev.sender.send(IPCKey.FinishShowOpenDialog, paths)
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onRequestShowSaveDialog = (ev: IpcMessageEvent, options: SaveDialogOptions) => {
  const path = dialog.showSaveDialog(BrowserWindow.fromWebContents(ev.sender), options)
  ev.sender.send(IPCKey.FinishShowSaveDialog, path)
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onRequestShowMessageBox = (ev: IpcMessageEvent, options: MessageBoxOptions) => {
  const button = dialog.showMessageBox(BrowserWindow.fromWebContents(ev.sender), options)
  ev.sender.send(IPCKey.FinishShowMessageBox, button)
}

/**
 * Occurs when an item enumeration in the folder is requested.
 * @param ev Event data.
 * @param options Path of the target folder.
 */
const onRequestEnumItems = (ev: IpcMessageEvent, folder?: string) => {
  EnumFiles(folder)
    .then((items) => {
      ev.sender.send(IPCKey.FinishEnumItems, items)
    })
    .catch(() => {
      ev.sender.send(IPCKey.FinishEnumItems, [])
    })
}

/**
 * Occurs when folder selection is requested.
 * @param ev Event data.
 */
const onRequestSelectFolder = (ev: IpcMessageEvent) => {
  const paths = dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender), {
    title: 'Select root folder',
    properties: ['openDirectory']
  })

  if (paths.length === 0) {
    ev.sender.send(IPCKey.FinishSelectFolder)
    return
  }

  let folder: FileItem
  GetFileInfo(paths[0])
    .then((item: FileItem) => {
      folder = item
      return EnumFiles(item.path)
    })
    .then((children: FileItem[]) => {
      folder.children = children
      ev.sender.send(IPCKey.FinishSelectFolder, folder)
    })
    .catch(() => {
      ev.sender.send(IPCKey.FinishSelectFolder)
    })
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
  ipcMain.on(IPCKey.RequestEnumItems, onRequestEnumItems)
  ipcMain.on(IPCKey.RequestSelectFolder, onRequestSelectFolder)
}

/**
 * Release IPC events.
 */
export const ReleaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestEnumItems)
    ipcMain.removeAllListeners(IPCKey.RequestSelectFolder)
    }

    initialized = false
}
