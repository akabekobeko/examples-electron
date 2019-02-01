import { IpcMessageEvent } from 'electron';
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem } from '../../common/TypeAliases';

const ipcRenderer = window.require('electron').ipcRenderer

export enum ActionType {
  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems',
  RequestAddRootFolder = 'RequestAddRootFolder',
  FinishAddRootFolder = 'FinishAddRootFolder'
}

export const requestEnumItems = () => ({
  type: ActionType.RequestEnumItems
})

export const finishEnumItems = (items: FileItem[]) => ({
  type: ActionType.FinishEnumItems,
  payload: {
    items
  }
})

export const enumItems = (folderPath: string) => (dispath: Dispatch) => {
  dispath(requestEnumItems())
  ipcRenderer.once(IPCKey.FinishEnumItems, (ev: IpcMessageEvent, items: FileItem[]) => {
    dispath(finishEnumItems(items))
  })

  ipcRenderer.send(IPCKey.RequestEnumItems, folderPath)
}

export const requestAddRootFolder = () => ({
  type: ActionType.RequestAddRootFolder
})

export const finishAddRootFolder = (folder: FileItem) => ({
  type: ActionType.FinishAddRootFolder,
  payload: {
    folder
  }
})

export const addRootFolder = () => (dispath: Dispatch) => {
  dispath(requestAddRootFolder())
  ipcRenderer.once(IPCKey.FinishSelectFolder, (ev: IpcMessageEvent, folder: FileItem) => {
    console.log(folder)
    dispath(finishAddRootFolder(folder))
  })

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}
