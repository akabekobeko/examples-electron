import { Dispatch } from '@reduxjs/toolkit'

export const createNewWindow = () => (dispatch: Dispatch) => {
  window.myAPI.createNewWindow()
}
