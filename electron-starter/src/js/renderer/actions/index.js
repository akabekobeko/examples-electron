import { IPCKeys } from '../../common/Constants.js'

export const UPDATE_DATETIME = 'UPDATE_DATETIME'
export const updateDateTime = () => ({
  type: UPDATE_DATETIME
})

export const REQUEST_SHOW_URL = 'REQUEST_SHOW_URL'
const requestShowURL = () => ({
  type: REQUEST_SHOW_URL
})

export const FINISH_SHOW_URL = 'FINISH_SHOW_URL'
const finishShowURL = () => ({
  type: FINISH_SHOW_URL
})

export const showURL = (url) => (dispatch) => {
  dispatch(requestShowURL())

  const ipc = window.require('electron').ipcRenderer
  ipc.on(IPCKeys.FinishShowURL, () => {
    dispatch(finishShowURL())
  })

  ipc.send(IPCKeys.RequestShowURL, url)
}
