import { Dispatch } from 'redux'
import { ActionType } from '../Types'

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

  const result = await window.myAPI.showSaveDialog({
    title: 'Save',
    message: 'Save the file'
  })

  dispatch(finishShowSaveDialog(result.filePath || ''))
}
