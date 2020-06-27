import { finishEnumSubFolders } from '../actions/index'
import { Folder, AppState } from '../Types'

/**
 * Compare old and new folder lists and merge to the latest state.
 * The folder that is still present keeps the structure including the subfolder.
 * @param old Old folders.
 * @param current Current folders
 * @returns Merged folders.
 */
export const merge = (old: Folder[], current: Folder[]): Folder[] => {
  if (old.length === 0 || current.length === 0) {
    return current
  }

  const exists = old.filter((a) => current.some((b) => a.path === b.path))
  const added = current.filter((a) => !old.some((b) => a.path === b.path))

  return exists
    .concat(added)
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))
}

/**
 * Check folders in the acquired folder and generate a list of appropriate folders.
 * @param folderPath Owner of new sub folders.
 * @param newSubFolders New sub folders.
 * @param updateTargetFolders Target folders of update.
 * @returns `true` if check succeeds and scanning can be stopped
 */
const checkFolders = (
  folderPath: string,
  newSubFolders: Folder[],
  updateTargetFolders: Folder[]
): boolean => {
  for (let targetFolder of updateTargetFolders) {
    if (!folderPath.startsWith(targetFolder.path)) {
      // Not parent and child
      continue
    } else if (targetFolder.path === folderPath) {
      targetFolder.subFolders = merge(targetFolder.subFolders, newSubFolders)
      return true
    }

    if (checkFolders(folderPath, newSubFolders, targetFolder.subFolders)) {
      return true
    }
  }

  return false
}

/**
 * Check the result of finishEnumSubFolders and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumSubFolders.
 * @returns New state.
 */
export const checkEnumSubFolders = (
  state: AppState,
  action: ReturnType<typeof finishEnumSubFolders>
): AppState => {
  if (!action.payload.subFolders || action.payload.subFolders.length === 0) {
    return state
  }

  const updateTargetFolders = state.folders.concat()
  updateTargetFolders.forEach((rootFolder) => {
    if (!action.payload.folderPath.startsWith(rootFolder.path)) {
      return
    }

    const subFolders = action.payload.subFolders.map(
      (subFolder): Folder =>
        Object.assign({}, subFolder, {
          treeId: rootFolder.treeId
        })
    )

    checkFolders(action.payload.folderPath, subFolders, [rootFolder])
  })

  return Object.assign({}, state, {
    folders: updateTargetFolders
  })
}
