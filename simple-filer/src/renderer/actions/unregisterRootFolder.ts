import { ActionType } from '../Types'

/**
 * Request to unregister current root folder.
 * @returns Action result.
 */
export const unregisterRootFolder = () => ({
  type: ActionType.RequestUnregisterRootFolder as ActionType.RequestUnregisterRootFolder
})
