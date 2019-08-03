import { IPCKey } from '../../common/Constants'
import { Dispatch } from 'redux'
import { IpcRenderer } from 'electron'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const createNewWindow = () => (dispatch: Dispatch) => {
  // Finish handler is UpdateWindowIds
  ipcRenderer.send(IPCKey.RequestCreateNewWindow)
}
