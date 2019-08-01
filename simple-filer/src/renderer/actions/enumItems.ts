import { IpcRenderer, IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem } from '../../common/Types'
import { ActionType, Folder } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

/**
 * Request item enumeration in the folder.
 * @returns Action result.
 */
export const requestEnumItems = () => ({
  type: ActionType.RequestEnumItems
})

/**
 * Notify that the enumeration of the items in the folder has finished.
 * @param folderPath Path of the target folder..
 * @param items Enumerated items.
 * @returns Action result.
 */
export const finishEnumItems = (folder: Folder, items: FileItem[]) => ({
  type: ActionType.FinishEnumItems as typeof ActionType.FinishEnumItems,
  payload: {
    folder,
    items
  }
})

/**
 * Enumerate the items in the folder.
 * @param folder Target foleder.
 */
export const enumItems = (folder: Folder) => (dispatch: Dispatch) => {
  dispatch(requestEnumItems())
  ipcRenderer.once(
    IPCKey.FinishEnumItems,
    (ev: IpcRendererEvent, folderPath: string, items: FileItem[]) => {
      dispatch(finishEnumItems(folder, items))
    }
  )

  ipcRenderer.send(IPCKey.RequestEnumItems, folder.path)
}
