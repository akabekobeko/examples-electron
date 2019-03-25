import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, AppState } from '../Types'
import { Presets, PresetIndexManual } from '../Constants'

const ipcRenderer = window.require('electron').ipcRenderer

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
export const connect = (connected: boolean) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  ipcRenderer.on(IPCKey.FinishApplyEqualizerState, () => {
    dispatch(finishConnect(connected))
  })

  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connect, getState().gains)
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
export const selectPreset = (presetIndex: number) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  ipcRenderer.on(IPCKey.FinishApplyEqualizerState, () => {
    dispatch(finishSelectPreset(presetIndex))
  })

  const connected = getState().connected
  const gains =
    presetIndex === PresetIndexManual ? getState().gains : Presets[presetIndex]

  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connected, gains)
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
export const updateGain = (index: number, value: number) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  ipcRenderer.on(IPCKey.FinishApplyEqualizerState, () => {
    dispatch(finishUpdateGain(index, value))
  })

  const connected = getState().connected
  const gains = getState().gains.concat()
  gains[index] = value

  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connected, gains)
}
