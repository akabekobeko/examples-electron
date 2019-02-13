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
import { FileItem } from '../common/TypeAliases'
import { EnumFiles, FileItemToFolder, FolderFromPath } from './FileManager'

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
 * Occurs when folder selection is requested.
 * @param ev Event data.
 */
const onRequestSelectFolder = (ev: IpcMessageEvent) => {
  const paths = dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender), {
    title: 'Select root folder',
    properties: ['openDirectory']
  })

  if (!paths || paths.length === 0) {
    ev.sender.send(IPCKey.FinishSelectFolder)
    return
  }

  let path = paths[0]
  EnumFiles(path)
    .then((items: FileItem[]) => {
      const folder = FolderFromPath(path)
      folder.subFolders = items.filter((item) => item.isDirectory).map((item) => FileItemToFolder(item))

      ev.sender.send(IPCKey.FinishSelectFolder, folder)
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
  EnumFiles(folderPath)
    .then((items) => {
      const subFolders = items.filter((item) => item.isDirectory).map((item) => FileItemToFolder(item))
      ev.sender.send(IPCKey.FinishEnumItems, folderPath, items, subFolders)
    })
    .catch(() => {
      ev.sender.send(IPCKey.FinishEnumItems, folderPath, [], [])
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
  ipcMain.on(IPCKey.RequestSelectFolder, onRequestSelectFolder)
  ipcMain.on(IPCKey.RequestEnumItems, onRequestEnumItems)
}

/**
 * Release IPC events.
 */
export const ReleaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestSelectFolder)
    ipcMain.removeAllListeners(IPCKey.RequestEnumItems)
  }

  initialized = false
}
