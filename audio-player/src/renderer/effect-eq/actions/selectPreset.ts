import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, AppState } from '../Types'
import { Presets, PresetIndexManual } from '../Constants'

const ipcRenderer = window.require('electron').ipcRenderer

export const requestSelectPreset = () => ({
  type: ActionType.RequestSelectPreset as ActionType.RequestSelectPreset
})

export const finishSelectPreset = (presetIndex: number) => ({
  type: ActionType.FinishSelectPreset as ActionType.FinishSelectPreset,
  payload: {
    presetIndex
  }
})

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

  dispatch(requestSelectPreset())
  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connected, gains)
}
