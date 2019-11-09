import { IpcRenderer, IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType, Folder } from '../types'
import { FileItem } from '../../common/Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

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
 * @param folderPath Path of the target foleder.
 */
export const enumSubFolders = (folderPath: string) => async (
  dispatch: Dispatch
) => {
  dispatch(requestEnumSubFolders())
  const items: FileItem[] = await ipcRenderer.invoke(
    IPCKey.EnumItems,
    folderPath
  )

  const folders = items
    .filter((item) => item.isDirectory)
    .map(
      (item): Folder => ({
        treeId: 0,
        isRoot: false,
        name: item.name,
        path: item.path,
        subFolders: []
      })
    )

  dispatch(finishEnumSubFolders(folderPath, folders))
}
