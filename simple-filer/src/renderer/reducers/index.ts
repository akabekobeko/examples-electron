import { ActionType, finishAddRootFolder, finishEnumItems } from '../actions/index'
import { Folder, FileItem, EnumItemsResult } from '../../common/TypeAliases';

type Actions = (
  | ReturnType<typeof finishAddRootFolder>
  | ReturnType<typeof finishEnumItems>
)

export type CurrentItem = {
  folderPath: string
  items: FileItem[]
}

export type AppState = {
  folders: Folder[]
  items: CurrentItem[]
}

const InitialState: AppState = {
  folders: [],
  items: []
}

const MAX_CACHE_ITEMS = 10

/**
 * Check folders in the acquired folder and generate a list of appropriate folders.
 * @param folderPath Owner of new sub folders.
 * @param newSubFolders New sub folders.
 * @param currentFolders Current folders.
 */
const checkFolders = (folderPath: string, newSubFolders: Folder[], folders: Folder[]) => {
  const merge = (old: Folder[], current: Folder[]): Folder[] => {
    if (old.length === 0 || current.length === 0) {
      return current
    }

    const exists = old.filter((a) => current.filter((b) => a.path === b.path))
    const added = current.filter((a) => old.some((b) => a.path !== b.path))

    return exists.concat(added).sort((a, b) => a.name < b.name ? -1 : 1)
  }

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

/**
 * Check items in the acquired folder and generate a list of appropriate items.
 * @param folderPath The path of the folder that is the parent of the item.
 * @param items Items.
 * @param currentItems Current items.
 * @returns List of items.
 */
const checkItems = (folderPath: string, items: FileItem[], currentItems: CurrentItem[]): CurrentItem[] => {
  const newCurrentItems = currentItems.concat()
  let exists = false
  for (let i = 0; i < newCurrentItems.length; ++i) {
    if (newCurrentItems[i].folderPath === folderPath) {
      exists = true
      newCurrentItems.splice(i, 1)
      newCurrentItems.push({ folderPath, items })
      break
    }
  }

  if (!exists) {
    if (newCurrentItems.length === MAX_CACHE_ITEMS) {
      newCurrentItems.shift()
    }

    newCurrentItems.push({ folderPath, items })
  }

  return newCurrentItems
}

/**
 * Check the result of finishAddRootFolder and generate a new state.
 * @param state Current state.
 * @param action Action of finishAddRootFolder.
 * @returns New state.
 */
const checkFinishAddRootFolder = (state: AppState, action: ReturnType<typeof finishAddRootFolder>): AppState => {
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
    folders: state.folders.concat(action.payload.folder),
    items: checkItems(action.payload.folder.path, action.payload.items, state.items)
  })
}

/**
 * Check the result of finishEnumItems and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumItems.
 * @returns New state.
 */
const checkFinishEnumItems = (state: AppState, action: ReturnType<typeof finishEnumItems>) => {
  const newFolders = state.folders.concat()
  checkFolders(action.payload.folderPath, action.payload.subFolders, newFolders)

  return Object.assign({}, state, {
    folders: newFolders,
    items: checkItems(action.payload.folderPath, action.payload.items, state.items)
  })
}

const reducer = (state = InitialState, action: Actions) => {
  switch (action.type) {
    case ActionType.FinishAddRootFolder:
      return checkFinishAddRootFolder(state, action)

    case ActionType.FinishEnumItems:
      return checkFinishEnumItems(state, action)

    default:
      return state
  }
}

export default reducer
