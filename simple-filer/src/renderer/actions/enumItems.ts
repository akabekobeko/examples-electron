import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from './types'
import { Folder, FileItem } from '../../common/Types'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Request item enumeration in the folder.
 * @returns Action result.
 */
export const requestEnumItems = () => ({
  type: ActionType.RequestEnumItems
})

/**
 * Notify that the enumeration of the items in the folder has finished.
 * @param items Enumerated items.
 * @returns Action result.
 */
export const finishEnumItems = (folderPath: string, items: FileItem[]) => ({
  type: ActionType.FinishEnumItems as typeof ActionType.FinishEnumItems,
  payload: {
    folderPath,
    items
  }
})

/**
 * Enumerate the items in the folder.
 * @param targetFolderPath Path of the target foleder.
 */
export const enumItems = (targetFolderPath: string) => (dispath: Dispatch) => {
  dispath(requestEnumItems())
  ipcRenderer.once(
    IPCKey.FinishEnumItems,
    (
      ev: IpcMessageEvent,
      folderPath: string,
      items: FileItem[],
      subFolders: Folder[]
    ) => {
      dispath(finishEnumItems(folderPath, items))
    }
  )

  ipcRenderer.send(IPCKey.RequestEnumItems, targetFolderPath)
}
