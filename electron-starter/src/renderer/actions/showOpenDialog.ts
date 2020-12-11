import { Dispatch } from 'redux'
import { ActionType } from '../Types'

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

  const result = await window.myAPI.showOpenDialog({
    title: 'Open',
    message: 'Open the file or folder',
    properties: ['openDirectory', 'multiSelections']
  })

  dispatch(finishShowOpenDialog(result.filePaths || []))
}
