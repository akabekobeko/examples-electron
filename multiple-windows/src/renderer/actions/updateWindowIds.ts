import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer
let handled = false

export const updateWindowIds = (windowIds: number[]) => ({
  type: ActionType.UpdateWindowIds as ActionType.UpdateWindowIds,
  payload: {
    windowIds
  }
})

export const handleUpdateWindowIds = () => (dispatch: Dispatch) => {
  // Register once
  if (handled) {
    return
  }
  handled = true

  ipcRenderer.on(
    IPCKey.UpdateWindowIds,
    (ev: IpcMessageEvent, windowIds: number[]) => {
      dispatch(updateWindowIds(windowIds))
    }
  )
}
