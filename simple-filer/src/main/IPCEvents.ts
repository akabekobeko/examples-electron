import {
  BrowserWindow,
  dialog,
  shell,
  ipcMain,
  IpcMainInvokeEvent
} from 'electron'
import Path from 'path'
import { IPCKey } from '../common/Constants'
import { FileItem, SelectFolderResult } from '../common/Types'
import { enumFiles } from './FileManager'

/**
 * Occurs when folder selection is requested.
 * @param ev Event data.
 */
const onSelectFolder = async (
  ev: IpcMainInvokeEvent
): Promise<SelectFolderResult | undefined> => {
  const win = BrowserWindow.fromWebContents(ev.sender)
  if (!win) {
    throw new Error('Message sender window does not exist')
  }

  const result = await dialog.showOpenDialog(win, {
    title: 'Select root folder',
    properties: ['openDirectory']
  })

  if (!result || !result.filePaths || result.filePaths.length === 0) {
    return
  }

  const folderPath = result.filePaths[0]
  const items = await enumFiles(folderPath)
  return { name: Path.basename(folderPath), folderPath, items }
}

/**
 * Occurs when an item enumeration in the folder is requested.
 * @param ev Event data.
 * @param folderPath Path of the target folder.
 */
const onEnumItems = async (
  ev: IpcMainInvokeEvent,
  folderPath: string
): Promise<FileItem[]> => {
  return await enumFiles(folderPath)
}

/**
 *Occurs in a request to open a file or folder in a shell
 * @param ev Event data.
 * @param itemPath Path of the target folder.
 * @returns Resolves with an string containing the error message corresponding to the failure if a failure occurred, otherwise `""`.
 */
const onOpenItem = async (
  ev: IpcMainInvokeEvent,
  itemPath: string
): Promise<string> => {
  return shell.openPath(itemPath)
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

  ipcMain.handle(IPCKey.SelectFolder, onSelectFolder)
  ipcMain.handle(IPCKey.EnumItems, onEnumItems)
  ipcMain.handle(IPCKey.OepnItem, onOpenItem)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.SelectFolder)
    ipcMain.removeAllListeners(IPCKey.EnumItems)
    ipcMain.removeAllListeners(IPCKey.OepnItem)
  }

  initialized = false
}
