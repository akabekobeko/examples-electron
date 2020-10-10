import { IpcRenderer, IpcRendererEvent } from 'electron'
import { ActionType } from '../RendererTypes'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const requestOpenItem = () => ({
  type: ActionType.RequestOpenItem
})

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const openItem = (itemPath: string) => async (dispatch: Dispatch) => {
  dispatch(requestOpenItem())
  const succeeded = await ipcRenderer.invoke(IPCKey.OepnItem, itemPath)
}
