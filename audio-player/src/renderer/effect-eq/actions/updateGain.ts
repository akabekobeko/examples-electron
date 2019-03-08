import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, AppState } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer

export const requestUpdateGain = () => ({
  type: ActionType.RequestUpdateGain as ActionType.RequestUpdateGain
})

export const finishUpdateGain = (index: number, value: number) => ({
  type: ActionType.FinishUpdateGain as ActionType.FinishUpdateGain,
  payload: {
    index,
    value
  }
})

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

  dispatch(requestUpdateGain())
  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connected, gains)
}
