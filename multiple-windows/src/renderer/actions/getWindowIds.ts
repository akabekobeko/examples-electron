import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { IpcRenderer } from 'electron'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const getWindowIds = () => (dispatch: Dispatch) => {
  // Finish handler is UpdateWindowIds
  ipcRenderer.invoke(IPCKey.GetWindowIds)
}
