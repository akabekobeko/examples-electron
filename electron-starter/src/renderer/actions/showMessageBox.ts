import { IpcRenderer, IpcRendererEvent, MessageBoxOptions } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const requestShowMessageBox = () => ({
  type: ActionType.RequestShowMessageBox as ActionType.RequestShowMessageBox
})

export const finishShowMessageBox = (button: number) => ({
  type: ActionType.FinishShowMessageBox as ActionType.FinishShowMessageBox,
  payload: {
    button
  }
})

export const showMessageBox = () => (dispatch: Dispatch) => {
  dispatch(requestShowMessageBox())
  ipcRenderer.on(
    IPCKey.FinishShowMessageBox,
    (ev: IpcRendererEvent, button: number) => {
      dispatch(finishShowMessageBox(button))
    }
  )

  const options: MessageBoxOptions = {
    type: 'info',
    title: 'Information',
    message: 'Message',
    detail: 'The quick brown fox jumps over the lazy dog.'
  }

  ipcRenderer.send(IPCKey.RequestShowMessageBox, options)
}
