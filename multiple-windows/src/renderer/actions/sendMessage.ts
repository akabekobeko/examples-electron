import { Dispatch } from 'redux'

export const sendMessage = (targetWindowId: number, message: string) => (
  dispatch: Dispatch
) => {
  window.myAPI.sendMessage(targetWindowId, message)
}
