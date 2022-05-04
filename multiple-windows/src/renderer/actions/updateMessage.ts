import { Dispatch } from '@reduxjs/toolkit'
import { ActionType } from '../Types'

let handled = false

export const updateMessage = (message: string) => ({
  type: ActionType.UpdateMessage as ActionType.UpdateMessage,
  payload: {
    message
  }
})

export const handleUpdateMessage = () => (dispatch: Dispatch) => {
  // Register once
  if (handled) {
    return
  }
  handled = true

  window.myAPI.onUpdateMessage((message: string) =>
    dispatch(updateMessage(message))
  )
}
