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
  const result = await dialog.showOpenDialog(
    BrowserWindow.fromWebContents(ev.sender),
    {
      title: 'Select root folder',
      properties: ['openDirectory']
    }
  )

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
 */
const onOpenItem = async (
  ev: IpcMainInvokeEvent,
  itemPath: string
): Promise<boolean> => {
  return shell.openItem(itemPath)
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
