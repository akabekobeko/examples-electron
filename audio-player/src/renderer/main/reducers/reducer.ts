import { ActionType, AppState, PlaybackState } from '../Types'
import { updateAppState } from '../actions/'

type Actions = ReturnType<typeof updateAppState>

const InitialState: AppState = {
  artists: [],
  currentArtist: null,
  currentMusic: null,
  playingMusic: null,
  playbackState: PlaybackState.Stopped,
  currentTime: 0,
  volume: 0,
  spectrums: null
}

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state: AppState = InitialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.UpdateAppState:
      if (action.error) {
        return state
      }

      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default reducer
