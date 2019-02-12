import { ActionType, finishAddRootFolder, finishEnumSubFolders, finishEnumItems } from '../actions/index'
import { Folder, FileItem } from '../../common/TypeAliases'
import { checkFolders } from './checkFolders'

type Actions =
  | ReturnType<typeof finishAddRootFolder>
  | ReturnType<typeof finishEnumSubFolders>
  | ReturnType<typeof finishEnumItems>

export type AppState = {
  folders: Folder[]
  items: FileItem[]
}

const InitialState: AppState = {
  folders: [],
  items: []
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
    folders: state.folders.concat(action.payload.folder)
  })
}

/**
 * Check the result of finishEnumSubFolders and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumSubFolders.
 * @returns New state.
 */
const checkFinishEnumSubFolders = (state: AppState, action: ReturnType<typeof finishEnumSubFolders>): AppState => {
  if (!action.payload.subFolders || action.payload.subFolders.length === 0) {
    return state
  }

  const newFolders = state.folders.concat()
  checkFolders(action.payload.folderPath, action.payload.subFolders, newFolders)

  return Object.assign({}, state, {
    folders: newFolders
  })
}

/**
 * Check the result of finishEnumItems and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumItems.
 * @returns New state.
 */
const checkFinishEnumItems = (state: AppState, action: ReturnType<typeof finishEnumItems>): AppState => {
  return Object.assign({}, state, {
    items: action.payload.items
  })
}

/**
 *
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = InitialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.FinishAddRootFolder:
      return checkFinishAddRootFolder(state, action)

    case ActionType.FinishEnumSubFolders:
      return checkFinishEnumSubFolders(state, action)

    case ActionType.FinishEnumItems:
      return checkFinishEnumItems(state, action)

    default:
      return state
  }
}

export default reducer
