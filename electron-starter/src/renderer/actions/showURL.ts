import { IpcRenderer, IpcRendererEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export const requestShowURL = () => ({
  type: ActionType.RequestShowURL as ActionType.RequestShowURL
})

export const finishShowURL = (succeeded: boolean) => ({
  type: ActionType.FinishShowURL as ActionType.FinishShowURL,
  payload: {
    succeeded
  }
})

export const showURL = (url: string) => async (dispatch: Dispatch) => {
  dispatch(requestShowURL())
  try {
    await ipcRenderer.invoke(IPCKey.ShowURL, url)
    dispatch(finishShowURL(true))
  } catch (err) {
    console.error(err)
    dispatch(finishShowURL(false))
  }
}
