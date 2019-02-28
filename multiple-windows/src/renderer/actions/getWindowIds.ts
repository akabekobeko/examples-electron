import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'

const ipcRenderer = window.require('electron').ipcRenderer

export const getWindowIds = () => (dispatch: Dispatch) => {
  // Finish handler is UpdateWindowIds
  ipcRenderer.send(IPCKey.RequestGetWindowIds)
}
