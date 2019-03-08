import { ActionType, AppState } from '../Types'
import {
  openWithPlay,
  play,
  pause,
  stop,
  seek,
  selectMusic,
  selectArtist,
  finishImportMusic,
  removeMusic
} from '../actions'

type Actions =
  | ReturnType<typeof openWithPlay>
  | ReturnType<typeof play>
  | ReturnType<typeof pause>
  | ReturnType<typeof stop>
  | ReturnType<typeof seek>
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
    default:
      return state
  }
}

export default reducer
