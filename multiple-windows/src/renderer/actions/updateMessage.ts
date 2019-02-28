import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer
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

  ipcRenderer.on(
    IPCKey.UpdateMessage,
    (ev: IpcMessageEvent, message: string) => {
      dispatch(updateMessage(message))
    }
  )
}
