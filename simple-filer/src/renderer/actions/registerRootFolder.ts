import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from './types'
import { Folder } from '../../common/Types'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Request to register root folder.
 * @returns Action result.
 */
export const requestRegisterRootFolder = () => ({
  type: ActionType.RequestRegisterRootFolder as ActionType.RequestRegisterRootFolder
})

/**
 * Notify that root folder register was finished.
 * @param folder Added folder.
 * @returns Action result.
 */
export const finishRegisterRootFolder = (folder: Folder) => ({
  type: ActionType.FinishRegisterRootFolder as ActionType.FinishRegisterRootFolder,
  payload: {
    folder
  }
})

/**
 * Add a folder to the root of the folder tree.
 */
export const registerRootFolder = () => (dispath: Dispatch) => {
  dispath(requestRegisterRootFolder())
  ipcRenderer.once(
    IPCKey.FinishSelectFolder,
    (ev: IpcMessageEvent, folder: Folder) => {
      dispath(finishRegisterRootFolder(folder))
    }
  )

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}
