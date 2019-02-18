import {
  ActionType,
  finishRegisterRootFolder,
  finishEnumSubFolders,
  finishEnumItems
} from '../actions/index'
import { AppState } from './types'
import { registerRootFolder } from './registerRootFolder'
import { enumSubFolders } from './enumSubFolders'
import { enumItems } from './enumItems'

type Actions =
  | ReturnType<typeof finishRegisterRootFolder>
  | ReturnType<typeof finishEnumSubFolders>
  | ReturnType<typeof finishEnumItems>

const InitialState: AppState = {
  currentFolder: {
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
      return registerRootFolder(state, action)

    case ActionType.FinishEnumSubFolders:
      return enumSubFolders(state, action)

    case ActionType.FinishEnumItems:
      return enumItems(state, action)

    default:
      return state
  }
}

export default reducer
