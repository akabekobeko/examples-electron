import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { IpcRenderer } from 'electron'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const sendMessage = (targetWindowId: number, message: string) => (
  dispatch: Dispatch
) => {
  ipcRenderer.send(IPCKey.RequestSendMessage, targetWindowId, message)
}
