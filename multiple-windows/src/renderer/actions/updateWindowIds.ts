import { Dispatch } from '@reduxjs/toolkit'
import { ActionType } from '../Types'

let handled = false

export const updateWindowIds = (windowIds: number[]) => ({
  type: ActionType.UpdateWindowIds as ActionType.UpdateWindowIds,
  payload: {
    windowIds
  }
})

export const handleUpdateWindowIds = () => (dispatch: Dispatch) => {
  // Register once
  if (handled) {
    return
  }
  handled = true

  window.myAPI.onUpdateWindowIds((windowIds: number[]) =>
    dispatch(updateWindowIds(windowIds))
  )
}
