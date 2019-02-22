import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem } from '../../common/Types'
import { Folder, ActionType } from '../Types'

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
 * @param folder Folder.
 * @returns Action result.
 */
export const finishRegisterRootFolder = (folder?: Folder) => ({
  type: ActionType.FinishRegisterRootFolder as ActionType.FinishRegisterRootFolder,
  payload: {
    folder
  }
})

/**
 * Add a folder to the root of the folder tree.
 */
export const registerRootFolder = () => (dispatch: Dispatch) => {
  dispatch(requestRegisterRootFolder())
  ipcRenderer.once(
    IPCKey.FinishSelectFolder,
    (ev: IpcMessageEvent, name: string, path: string, items: FileItem[]) => {
      if (!name) {
        return dispatch(finishRegisterRootFolder())
      }

      const folder = {
        treeId: 0,
        isRoot: true,
        name,
        path,
        subFolders: items
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
      }

      dispatch(finishRegisterRootFolder(folder))
    }
  )

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}
