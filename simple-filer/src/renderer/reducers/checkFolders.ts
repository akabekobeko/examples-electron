import { Folder } from '../../common/TypeAliases'

/**
 * Compare old and new folder lists and merge to the latest state.
 * The folder that is still present keeps the structure including the subfolder.
 * @param old Old folders.
 * @param current Current folders
 * @returns Merged folders.
 */
const merge = (old: Folder[], current: Folder[]): Folder[] => {
  if (old.length === 0 || current.length === 0) {
    return current
  }

  const exists = old.filter((a) => current.some((b) => a.path === b.path))
  const added = current.filter((a) => !old.some((b) => a.path === b.path))

  return exists.concat(added).sort((a, b) => (a.name < b.name ? -1 : 1))
}

/**
 * Check folders in the acquired folder and generate a list of appropriate folders.
 * @param folderPath Owner of new sub folders.
 * @param newSubFolders New sub folders.
 * @param currentFolders Current folders.
 */
export const checkFolders = (folderPath: string, newSubFolders: Folder[], folders: Folder[]) => {
  for (let folder of folders) {
    if (folder.path === folderPath) {
      folder.subFolders = merge(folder.subFolders, newSubFolders)
      return true
    }

    if (checkFolders(folderPath, newSubFolders, folder.subFolders)) {
      return true
    }
  }

  return false
}

export default checkFolders
