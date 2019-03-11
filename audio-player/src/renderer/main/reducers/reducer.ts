import { ActionType, AppState } from '../Types'
import audioPlayerReducer, {
  Actions as AudioPlayerActions
} from './audioPlayerReducer'
import musicListReducer, {
  Actions as MusicPlayerActions
} from './musicListReducer'

type Actions = AudioPlayerActions | MusicPlayerActions

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = {}, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.OpenMusicWithPlay:
    case ActionType.Play:
    case ActionType.Pause:
    case ActionType.Stop:
    case ActionType.Seek:
    case ActionType.ChangeVolume:
      return audioPlayerReducer(state, action)

    case ActionType.SelectMusic:
    case ActionType.SelectArtist:
    case ActionType.SelectMusic:
    case ActionType.FinishImportMusic:
    case ActionType.RemoveMusic:
      return musicListReducer(state, action)

    default:
      return state
  }
}

export default reducer
