import { ActionType, AppState } from '../Types'
import {
  selectMusic,
  selectArtist,
  finishImportMusic,
  removeMusic
} from '../actions'

export type Actions =
  | ReturnType<typeof selectMusic>
  | ReturnType<typeof selectArtist>
  | ReturnType<typeof finishImportMusic>
  | ReturnType<typeof removeMusic>
/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = {}, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.SelectMusic:
      return state

    case ActionType.SelectArtist:
      return state

    case ActionType.SelectMusic:
      return state

    case ActionType.FinishImportMusic:
      return state

    case ActionType.RemoveMusic:
      return state

    default:
      return state
  }
}

export default reducer
