import { IpcRenderer, SaveDialogOptions, SaveDialogReturnValue } from 'electron'
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

export const showSaveDialog = () => async (dispatch: Dispatch) => {
  dispatch(requestShowSaveDialog())
  const options: SaveDialogOptions = {
    title: 'Save',
    message: 'Save the file'
  }

  const result: SaveDialogReturnValue = await ipcRenderer.invoke(
    IPCKey.ShowSaveDialog,
    options
  )
  dispatch(finishShowSaveDialog(result.filePath || ''))
}
