import { IPCKey } from '../../common/Constants'
import { Dispatch } from 'redux'

const ipcRenderer = window.require('electron').ipcRenderer

export const createNewWindow = () => (dispatch: Dispatch) => {
  // Finish handler is UpdateWindowIds
  ipcRenderer.send(IPCKey.RequestCreateNewWindow)
}
