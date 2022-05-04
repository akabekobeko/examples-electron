import { Dispatch } from '@reduxjs/toolkit'
import { ActionType } from '../Types'

export const requestShowURL = () => ({
  type: ActionType.RequestShowURL as ActionType.RequestShowURL
})

export const finishShowURL = (succeeded: boolean) => ({
  type: ActionType.FinishShowURL as ActionType.FinishShowURL,
  payload: {
    succeeded
  }
})

export const showURL = (url: string) => async (dispatch: Dispatch) => {
  dispatch(requestShowURL())
  try {
    await window.myAPI.showURL(url)
    dispatch(finishShowURL(true))
  } catch (err) {
    console.error(err)
    dispatch(finishShowURL(false))
  }
}
