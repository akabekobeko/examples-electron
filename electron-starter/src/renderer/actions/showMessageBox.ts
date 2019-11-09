import {
  IpcRenderer,
  IpcRendererEvent,
  MessageBoxOptions,
  MessageBoxReturnValue
} from 'electron'
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

/**
 * Show the message box.
 */
export const showMessageBox = () => async (dispatch: Dispatch) => {
  dispatch(requestShowMessageBox())

  const options: MessageBoxOptions = {
    type: 'info',
    title: 'Information',
    message: 'Message',
    detail: 'The quick brown fox jumps over the lazy dog.'
  }

  const result: MessageBoxReturnValue = await ipcRenderer.invoke(
    IPCKey.ShowMessageBox,
    options
  )

  dispatch(finishShowMessageBox(result.response))
}
