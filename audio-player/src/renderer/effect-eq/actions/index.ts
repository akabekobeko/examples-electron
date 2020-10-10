import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, AppState } from '../Types'
import { Presets, PresetIndexManual } from '../Constants'
import { IpcRenderer } from 'electron'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

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
  await ipcRenderer.invoke(
    IPCKey.ApplyEqualizerState,
    connected,
    getState().gains
  )
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
    presetIndex === PresetIndexManual ? getState().gains : Presets[presetIndex]
  await ipcRenderer.invoke(IPCKey.ApplyEqualizerState, connected, gains)
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

  await ipcRenderer.invoke(IPCKey.ApplyEqualizerState, connected, gains)
  dispatch(finishUpdateGain(index, value))
}
