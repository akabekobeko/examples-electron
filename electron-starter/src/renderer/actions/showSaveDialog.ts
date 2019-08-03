import {
  IpcRenderer,
  IpcRendererEvent,
  SaveDialogOptions,
  SaveDialogReturnValue
} from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

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
    (
      ev: IpcRendererEvent,
      err: Error | null,
      result: SaveDialogReturnValue
    ) => {
      dispatch(finishShowSaveDialog(result.filePath || ''))
    }
  )

  const options: SaveDialogOptions = {
    title: 'Save',
    message: 'Save the file'
  }

  ipcRenderer.send(IPCKey.RequestShowSaveDialog, options)
}
