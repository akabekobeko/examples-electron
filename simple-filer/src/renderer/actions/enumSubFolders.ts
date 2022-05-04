import { Dispatch } from '@reduxjs/toolkit'
import { ActionType, Folder } from '../RendererTypes'
import { FileItem } from '../../common/Types'

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
 * @param folderPath Path of the target folder.
 */
export const enumSubFolders =
  (folderPath: string) => async (dispatch: Dispatch) => {
    dispatch(requestEnumSubFolders())
    const items: FileItem[] = await window.myAPI.enumItems(folderPath)

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
