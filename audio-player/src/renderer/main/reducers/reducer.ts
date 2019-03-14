import { ActionType, AppState, PlaybackState } from '../Types'
import { updateMusicList, updatePlayerState } from '../actions/'

type Actions =
  | ReturnType<typeof updateMusicList>
  | ReturnType<typeof updatePlayerState>

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
    case ActionType.UpdateMusicList:
      return { ...state, ...action.payload }

    case ActionType.UpdatePlayerState:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default reducer
