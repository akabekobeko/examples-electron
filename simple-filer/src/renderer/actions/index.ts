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

const requestEnumItems = () => ({
  type: ActionType.RequestEnumItems
})

const finishEnumItems = (items: FileItem[]) => ({
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

const requestAddRootFolder = () => ({
  type: ActionType.RequestAddRootFolder
})

const finishAddRootFolder = (folder: FileItem) => ({
  type: ActionType.FinishAddRootFolder,
  payload: {
    folder
  }
})

export const addRootFolder = () => (dispath: Dispatch) => {
  dispath(requestAddRootFolder())
  ipcRenderer.once(IPCKey.FinishShowOpenDialog, (ev: IpcMessageEvent, folder: FileItem) => {
    dispath(finishAddRootFolder(folder))
  })

  const options = {
    title: 'Select root folder',
    properties: ['openDirectory']
  }

  ipcRenderer.send(IPCKey.RequestShowOpenDialog, options)
}
