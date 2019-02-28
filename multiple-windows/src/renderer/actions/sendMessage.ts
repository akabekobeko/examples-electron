import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'

const ipcRenderer = window.require('electron').ipcRenderer

export const sendMessage = (targetWindowId: number, message: string) => (
  dispatch: Dispatch
) => {
  ipcRenderer.send(IPCKey.RequestSendMessage, targetWindowId, message)
}
