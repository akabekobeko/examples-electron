import { ActionType } from './types'

/**
 * Request to unregister root folder.
 * @param folderPath Target folder path.
 * @returns Action result.
 */
export const requestUnregisterRootFolder = (folderPath: string) => ({
  type: ActionType.RequestUnregisterRootFolder as ActionType.RequestUnregisterRootFolder,
  folderPath
})
