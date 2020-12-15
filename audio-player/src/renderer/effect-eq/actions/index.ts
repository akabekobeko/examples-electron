import { Dispatch } from 'redux'
import { ActionType, AppState } from '../Types'
import { Presets, PresetIndexManual } from '../Constants'

export const finishConnect = (connected: boolean) => ({
  type: ActionType.FinishConnect as ActionType.FinishConnect,
  payload: {
    connected
  }
})

/**
 * Switches the connection status of the effector.
 * @param connected `true` if the effector is connected, `false` if disconnected.
 */
export const connect = (connected: boolean) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  await window.myAPI.applyEqualizerState(connected, getState().gains)
  dispatch(finishConnect(connected))
}

export const finishSelectPreset = (presetIndex: number) => ({
  type: ActionType.FinishSelectPreset as ActionType.FinishSelectPreset,
  payload: {
    presetIndex
  }
})

/**
 * Select an equalizer preset.
 * @param presetIndex Index number of presets.
 */
export const selectPreset = (presetIndex: number) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const connected = getState().connected
  const gains =
    presetIndex === PresetIndexManual
      ? getState().gains
      : Presets[presetIndex].gains

  await window.myAPI.applyEqualizerState(connected, gains)
  dispatch(finishSelectPreset(presetIndex))
}

export const finishUpdateGain = (index: number, value: number) => ({
  type: ActionType.FinishUpdateGain as ActionType.FinishUpdateGain,
  payload: {
    index,
    value
  }
})

/**
 * Update gain.
 * @param index Index number of gains.
 * @param value Value of gain.
 */
export const updateGain = (index: number, value: number) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const connected = getState().connected
  const gains = getState().gains.concat()
  gains[index] = value

  await window.myAPI.applyEqualizerState(connected, gains)
  dispatch(finishUpdateGain(index, value))
}
