import { finishRegisterRootFolder } from '../actions/index'
import { AppState, Folder } from '../RendererTypes'

/**
 * A unique identifier to assign to the next added tree.
 */
let NEXT_TREE_ID = 1

/**
 * Check the result of finishRegisterRootFolder and generate a new state.
 * @param state Current state.
 * @param action Action of finishRegisterRootFolder.
 * @returns New state.
 */
export const checkRegisterRootFolder = (
  state: AppState,
  action: ReturnType<typeof finishRegisterRootFolder>
): AppState => {
  if (!action.payload.folder) {
    return state
  }

  // Duplicate paths are not allowed
  for (let folder of state.folders) {
    if (action.payload.folder.path === folder.path) {
      return state
    }
  }

  const newRootFolder = action.payload.folder
  newRootFolder.treeId = NEXT_TREE_ID++
  newRootFolder.isRoot = true
  newRootFolder.subFolders = newRootFolder.subFolders.map(
    (subFolder): Folder =>
      Object.assign({}, subFolder, {
        treeId: newRootFolder.treeId
      })
  )

  return Object.assign({}, state, {
    folders: state.folders.concat(newRootFolder)
  })
}
