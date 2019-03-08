import { AppState } from '../Types'
import { finishUpdateGain } from '../actions'
import { saveAppState } from './storage'
import { PresetIndexManual } from '../Constants'

export const checkUpdateGain = (
  state: AppState,
  action: ReturnType<typeof finishUpdateGain>
): AppState => {
  const gains = state.gains.concat()
  if (gains[action.payload.index] === action.payload.value) {
    return state
  } else {
    gains[action.payload.index] = action.payload.value
  }

  // When the value is edited, the preset is `Manual`
  const newState = Object.assign({}, state, {
    presetInex: PresetIndexManual,
    gains: gains
  })

  saveAppState(newState)
  return newState
}
