import { IpcMessageEvent, SaveDialogOptions } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer

export const requestShowSaveDialog = () => ({
  type: ActionType.RequestShowSaveDialog as ActionType.RequestShowSaveDialog
})

export const finishShowSaveDialog = (path: string) => ({
  type: ActionType.FinishShowSaveDialog as ActionType.FinishShowSaveDialog,
  payload: {
    path
  }
})

export const showSaveDialog = () => (dispatch: Dispatch) => {
  dispatch(requestShowSaveDialog())
  ipcRenderer.on(
    IPCKey.FinishShowSaveDialog,
    (ev: IpcMessageEvent, path: string) => {
      dispatch(finishShowSaveDialog(path))
    }
  )

  const options: SaveDialogOptions = {
    title: 'Save',
    message: 'Save the file'
  }

  ipcRenderer.send(IPCKey.RequestShowSaveDialog, options)
}
