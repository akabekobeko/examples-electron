import { Dispatch } from '@reduxjs/toolkit'
import { Folder, ActionType } from '../RendererTypes'

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
export const registerRootFolder = () => async (dispatch: Dispatch) => {
  dispatch(requestRegisterRootFolder())
  const result = await window.myAPI.selectFolder()
  if (!result) {
    return dispatch(finishRegisterRootFolder())
  }

  const folder: Folder = {
    treeId: 0,
    isRoot: true,
    name: result.name,
    path: result.folderPath,
    subFolders: result.items
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
