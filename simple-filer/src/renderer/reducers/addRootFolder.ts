import { finishAddRootFolder } from '../actions/index'
import { AppState } from './types'

/**
 * Check the result of finishAddRootFolder and generate a new state.
 * @param state Current state.
 * @param action Action of finishAddRootFolder.
 * @returns New state.
 */
export const addRootFolder = (state: AppState, action: ReturnType<typeof finishAddRootFolder>): AppState => {
  if (!action.payload.folder) {
    return state
  }

  // Duplicate paths are not allowed
  for (let folder of state.folders) {
    if (action.payload.folder.path === folder.path) {
      return state
    }
  }

  return Object.assign({}, state, {
    folders: state.folders.concat(action.payload.folder)
  })
}

export default addRootFolder
