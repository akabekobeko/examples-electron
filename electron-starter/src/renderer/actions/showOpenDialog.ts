import {
  IpcRenderer,
  IpcRendererEvent,
  OpenDialogOptions,
  OpenDialogReturnValue
} from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const requestShowOpenDialog = () => ({
  type: ActionType.RequestShowOpenDialog as ActionType.RequestShowOpenDialog
})

export const finishShowOpenDialog = (paths: string[]) => ({
  type: ActionType.FinishShowOpenDialog as ActionType.FinishShowOpenDialog,
  payload: {
    paths
  }
})

export const showOpenDialog = () => async (dispatch: Dispatch) => {
  dispatch(requestShowOpenDialog())

  const options: OpenDialogOptions = {
    title: 'Open',
    message: 'Open the file or folder',
    properties: ['openDirectory', 'multiSelections']
  }

  const result: OpenDialogReturnValue = await ipcRenderer.invoke(
    IPCKey.ShowOpenDialog,
    options
  )
  dispatch(finishShowOpenDialog(result.filePaths || []))
}
