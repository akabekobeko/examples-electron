import { unregisterRootFolder } from '../actions/index'
import { AppState } from '../Types'

/**
 * Check the result of requestUnregisterRootFolder and generate a new state.
 * It is processed only when the currently selected folder is root.
 * @param state Current state.
 * @param action Action of requestUnregisterRootFolder.
 * @returns New state.
 */
export const checkUnregisterRootFolder = (
  state: AppState,
  action: ReturnType<typeof unregisterRootFolder>
): AppState => {
  let newFolders = state.folders
  for (let i = 0; i < newFolders.length; ++i) {
    const folder = newFolders[i]
    if (folder.path === state.currentFolder.path) {
      newFolders.splice(i, 1)
      break
    }
  }

  return Object.assign({}, state, {
    folders: newFolders,
    currentFolder: {
      treeId: 0,
      path: '',
      isRoot: false
    },
    items: []
  })
}

export default checkUnregisterRootFolder
