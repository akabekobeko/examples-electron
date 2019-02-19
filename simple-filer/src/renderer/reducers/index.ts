import {
  finishRegisterRootFolder,
  finishEnumSubFolders,
  finishEnumItems,
  unregisterRootFolder
} from '../actions/index'
import { ActionType, AppState } from '../Types'
import { checkRegisterRootFolder } from './registerRootFolder'
import { checkUnregisterRootFolder } from './unregisterRootFolder'
import { checkEnumSubFolders } from './enumSubFolders'
import { checkEnumItems } from './enumItems'

type Actions =
  | ReturnType<typeof finishRegisterRootFolder>
  | ReturnType<typeof finishEnumSubFolders>
  | ReturnType<typeof finishEnumItems>
  | ReturnType<typeof unregisterRootFolder>

const InitialState: AppState = {
  currentFolder: {
    treeId: 0,
    path: '',
    isRoot: false
  },
  folders: [],
  items: []
}

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = InitialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.FinishRegisterRootFolder:
      return checkRegisterRootFolder(state, action)

    case ActionType.RequestUnregisterRootFolder:
      return checkUnregisterRootFolder(state, action)

    case ActionType.FinishEnumSubFolders:
      return checkEnumSubFolders(state, action)

    case ActionType.FinishEnumItems:
      return checkEnumItems(state, action)

    default:
      return state
  }
}

export default reducer
