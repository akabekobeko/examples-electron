import { IPCKeys } from '../../common/Constants.js'
const ipc = window.require('electron').ipcRenderer

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const updateMessage = (message) => ({
  type: UPDATE_MESSAGE,
  payload: {
    message
  }
})

export const UPDATE_WINDOW_IDS = 'UPDATE_WINDOW_IDS'
const updateWindowIDs = (windowIDs) => ({
  type: UPDATE_WINDOW_IDS,
  payload: {
    windowIDs
  }
})

export const onUpdateMessage = () => (dispatch) => {
  ipc.on(IPCKeys.UpdateMessage, (ev, message) => {
    dispatch(updateMessage(message))
  })
}

export const onUpdateWindowIDs = () => (dispatch) => {
  ipc.on(IPCKeys.UpdateWindowIDs, (ev, windowIDs) => {
    dispatch(updateWindowIDs(windowIDs))
  })
}

export const sendMessage = (id, message) => (dispatch) => {
  if (!(id && message)) {
    return
  }

  ipc.send(IPCKeys.RequestSendMessage, id, message)
}

export const createNewWindow = () => (dispatch) => {
  ipc.send(IPCKeys.RequestCreateNewWindow)
}

export const getWindowIDs = () => (dispatch) => {
  ipc.on(IPCKeys.FinishGetWindowIDs, (ev, windowIDs) => {
    dispatch(updateWindowIDs(windowIDs))
  })

  ipc.send(IPCKeys.RequestGetWindowIDs)
}
