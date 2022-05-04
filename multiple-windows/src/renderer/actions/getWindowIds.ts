import { Dispatch } from '@reduxjs/toolkit'
import { ActionType } from '../Types'

export const finishGetWindowIds = (windowIds: number[]) => ({
  type: ActionType.GetWindowIds as ActionType.GetWindowIds,
  payload: {
    windowIds
  }
})

export const getWindowIds = () => async (dispatch: Dispatch) => {
  const windowIds = await window.myAPI.getWindowIds()
  dispatch(finishGetWindowIds(windowIds))
}
