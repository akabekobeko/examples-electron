import { IpcMessageEvent } from 'electron'
import { ActionType } from '../Types'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const requestOpenItem = () => ({
  type: ActionType.RequestEnumItems
})

/**
 * Notify that open the selected item with an operating system (shell).
 * @param succeeded `true` if the operation succeeded.
 * @returns Action result.
 */
export const finishOpenItem = (succeeded: boolean) => ({
  type: ActionType.FinishEnumItems,
  payload: {
    succeeded
  }
})

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const openItem = (itemPath: string) => (dispatch: Dispatch) => {
  dispatch(requestOpenItem())
  ipcRenderer.once(
    IPCKey.FinishOpenItem,
    (ev: IpcMessageEvent, succeeded: boolean) => {
      dispatch(finishOpenItem(succeeded))
    }
  )

  ipcRenderer.send(IPCKey.RequestOepnItem, itemPath)
}
