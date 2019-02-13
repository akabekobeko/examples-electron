import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from './types'
import { Folder } from '../../common/TypeAliases'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Request to add root folder.
 * @returns Action result.
 */
export const requestAddRootFolder = () => ({
  type: ActionType.RequestAddRootFolder as ActionType.RequestAddRootFolder
})

/**
 * Notify that root folder addition was finished.
 * @param folder Added folder.
 * @returns Action result.
 */
export const finishAddRootFolder = (folder: Folder) => ({
  type: ActionType.FinishAddRootFolder as ActionType.FinishAddRootFolder,
  payload: {
    folder
  }
})

/**
 * Add a folder to the root of the folder tree.
 */
export const addRootFolder = () => (dispath: Dispatch) => {
  dispath(requestAddRootFolder())
  ipcRenderer.once(IPCKey.FinishSelectFolder, (ev: IpcMessageEvent, folder: Folder) => {
    dispath(finishAddRootFolder(folder))
  })

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}
