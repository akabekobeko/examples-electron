import { Dispatch } from 'redux'

export const createNewWindow = () => (dispatch: Dispatch) => {
  window.myAPI.createNewWindow()
}
