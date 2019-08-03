import { BrowserWindow, dialog, shell, ipcMain, IpcMainEvent } from 'electron'
import Path from 'path'
import { IPCKey } from '../common/Constants'
import { FileItem } from '../common/Types'
import { enumFiles } from './FileManager'

/**
 * Occurs when folder selection is requested.
 * @param ev Event data.
 */
const onRequestSelectFolder = async (ev: IpcMainEvent) => {
  const result = await dialog.showOpenDialog(
    BrowserWindow.fromWebContents(ev.sender),
    {
      title: 'Select root folder',
      properties: ['openDirectory']
    }
  )

  if (!result || !result.filePaths || result.filePaths.length === 0) {
    ev.sender.send(IPCKey.FinishSelectFolder)
    return
  }

  let folderPath = result.filePaths[0]
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
const onRequestEnumItems = (ev: IpcMainEvent, folderPath?: string) => {
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
const onRequestOpenItem = (ev: IpcMainEvent, itemPath: string) => {
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

  ipcMain.on(IPCKey.RequestSelectFolder, onRequestSelectFolder)
  ipcMain.on(IPCKey.RequestEnumItems, onRequestEnumItems)
  ipcMain.on(IPCKey.RequestOepnItem, onRequestOpenItem)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestSelectFolder)
    ipcMain.removeAllListeners(IPCKey.RequestEnumItems)
    ipcMain.removeAllListeners(IPCKey.RequestOepnItem)
  }

  initialized = false
}
