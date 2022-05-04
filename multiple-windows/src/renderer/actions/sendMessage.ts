import { Dispatch } from '@reduxjs/toolkit'

export const sendMessage =
  (targetWindowId: number, message: string) => (dispatch: Dispatch) => {
    window.myAPI.sendMessage(targetWindowId, message)
  }
