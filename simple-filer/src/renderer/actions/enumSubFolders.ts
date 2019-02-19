import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType, Folder } from '../types'
import { FileItem } from '../../common/Types'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Request sub folders enumeration in the folder.
 * @returns Action result.
 */
export const requestEnumSubFolders = () => ({
  type: ActionType.RequestEnumSubFolders as ActionType.RequestEnumSubFolders
})

/**
 * Notify that the enumeration of the sub folders in the folder has finished.
 * @param items Enumerated sub folders.
 * @returns Action result.
 */
export const finishEnumSubFolders = (
  folderPath: string,
  subFolders: Folder[]
) => ({
  type: ActionType.FinishEnumSubFolders as ActionType.FinishEnumSubFolders,
  payload: {
    folderPath,
    subFolders
  }
})

/**
 * Enumerate the sub folders in the folder.
 * @param targetFolderPath Path of the target foleder.
 */
export const enumSubFolders = (targetFolderPath: string) => (
  dispath: Dispatch
) => {
  dispath(requestEnumSubFolders())
  ipcRenderer.once(
    IPCKey.FinishEnumItems,
    (ev: IpcMessageEvent, folderPath: string, items: FileItem[]) => {
      const subFolders = items
        .filter((item) => item.isDirectory)
        .map((item) => ({
          treeId: 0,
          name: item.name,
          path: item.path,
          subFolders: []
        }))

      dispath(finishEnumSubFolders(folderPath, subFolders))
    }
  )

  ipcRenderer.send(IPCKey.RequestEnumItems, targetFolderPath)
}
