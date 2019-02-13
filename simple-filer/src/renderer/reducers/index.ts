import { ActionType, finishAddRootFolder, finishEnumSubFolders, finishEnumItems } from '../actions/index'
import { AppState } from './types'
import { addRootFolder } from './addRootFolder'
import { enumSubFolders } from './enumSubFolders'
import { enumItems } from './enumItems'

type Actions =
  | ReturnType<typeof finishAddRootFolder>
  | ReturnType<typeof finishEnumSubFolders>
  | ReturnType<typeof finishEnumItems>

const InitialState: AppState = {
  folders: [],
  items: []
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
      return addRootFolder(state, action)

    case ActionType.FinishEnumSubFolders:
      return enumSubFolders(state, action)

    case ActionType.FinishEnumItems:
      return enumItems(state, action)

    default:
      return state
  }
}

export default reducer
