import { ActionType, AppState } from '../Types'
import { finishConnect, finishSelectPreset, finishUpdateGain } from '../actions'
import { Presets, PresetIndexManual } from '../Constants'
import { loadAppState, saveAppState } from './storage'

type Actions =
  | ReturnType<typeof finishConnect>
  | ReturnType<typeof finishSelectPreset>
  | ReturnType<typeof finishUpdateGain>

/**
 * Check the result of finishConnect and generate a new state.
 * @param state Current state.
 * @param action Action of finishConnect.
 * @returns New state.
 */
const checkConnect = (
  state: AppState,
  action: ReturnType<typeof finishConnect>
): AppState => {
  const newState = Object.assign({}, state, {
    connected: action.payload.connected
  })

  saveAppState(newState)
  return newState
}

/**
 * Check the result of finishSelectPreset and generate a new state.
 * @param state Current state.
 * @param action Action of finishSelectPreset.
 * @returns New state.
 */
const checkSelectPreset = (
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

const checkUpdateGain = (
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

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = loadAppState(), action: Actions): AppState => {
  switch (action.type) {
    case ActionType.FinishConnect:
      return checkConnect(state, action)

    case ActionType.FinishSelectPreset:
      return checkSelectPreset(state, action)

    case ActionType.FinishUpdateGain:
      return checkUpdateGain(state, action)

    default:
      return state
  }
}

export default reducer
