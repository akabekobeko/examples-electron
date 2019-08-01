import { IpcRenderer, IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer
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
    (ev: IpcRendererEvent, message: string) => {
      dispatch(updateMessage(message))
    }
  )
}
