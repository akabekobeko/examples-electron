import { AppState } from '../Types'
import { finishSelectPreset } from '../actions'
import { saveAppState } from './storage'
import { Presets, PresetIndexManual } from '../Constants'

/**
 * Check the result of finishSelectPreset and generate a new state.
 * @param state Current state.
 * @param action Action of finishSelectPreset.
 * @returns New state.
 */
export const checkSelectPreset = (
  state: AppState,
  action: ReturnType<typeof finishSelectPreset>
): AppState => {
  const presetIndex = action.payload.presetIndex
  if (presetIndex === state.presetIndex) {
    return state
  }

  const gains =
    presetIndex === PresetIndexManual ? state.gains : Presets[presetIndex].gains

  const newState = Object.assign({}, state, {
    presetIndex,
    gains
  })

  saveAppState(newState)
  return newState
}
