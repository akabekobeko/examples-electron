import { Dispatch } from 'redux'
import { ActionType } from '../Types'

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

  const result = await window.myAPI.showMessageBox({
    type: 'info',
    title: 'Information',
    message: 'Message',
    detail: 'The quick brown fox jumps over the lazy dog.'
  })

  dispatch(finishShowMessageBox(result.response))
}
