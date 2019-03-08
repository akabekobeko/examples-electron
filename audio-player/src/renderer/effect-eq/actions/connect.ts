import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, AppState } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer

export const requestConnect = () => ({
  type: ActionType.RequestConnect as ActionType.RequestConnect
})

export const finishConnect = (connected: boolean) => ({
  type: ActionType.FinishConnect as ActionType.FinishConnect,
  payload: {
    connected
  }
})

export const connect = (connected: boolean) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  ipcRenderer.on(IPCKey.FinishApplyEqualizerState, () => {
    dispatch(finishConnect(connected))
  })

  dispatch(requestConnect())
  ipcRenderer.send(IPCKey.RequestApplyEqualizerState, connect, getState().gains)
}
