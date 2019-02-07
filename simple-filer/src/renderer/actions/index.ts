import { IpcMessageEvent } from 'electron';
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem, Folder, EnumItemsResult } from '../../common/TypeAliases';

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

export const finishEnumItems = (result: EnumItemsResult) => ({
  type: ActionType.FinishEnumItems as typeof ActionType.FinishEnumItems,
  payload: result
})

export const enumItems = (targetFolderPath: string) => (dispath: Dispatch) => {
  dispath(requestEnumItems())
  ipcRenderer.once(IPCKey.FinishEnumItems, (ev: IpcMessageEvent, result: EnumItemsResult) => {
    dispath(finishEnumItems(result))
  })

  ipcRenderer.send(IPCKey.RequestEnumItems, targetFolderPath)
}

export const requestAddRootFolder = () => ({
  type: ActionType.RequestAddRootFolder as ActionType.RequestAddRootFolder
})

export const finishAddRootFolder = (folder: Folder, items: FileItem[]) => ({
  type: ActionType.FinishAddRootFolder as ActionType.FinishAddRootFolder,
  payload: {
    folder,
    items
  }
})

export const addRootFolder = () => (dispath: Dispatch) => {
  dispath(requestAddRootFolder())
  ipcRenderer.once(IPCKey.FinishSelectFolder, (ev: IpcMessageEvent, folder: Folder, items: FileItem[]) => {
    dispath(finishAddRootFolder(folder, items))
  })

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}
