import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem, Folder } from '../../common/TypeAliases'

const ipcRenderer = window.require('electron').ipcRenderer

export enum ActionType {
  RequestAddRootFolder = 'RequestAddRootFolder',
  FinishAddRootFolder = 'FinishAddRootFolder',
  RequestEnumSubFolders = 'RequestEnumSubFolders',
  FinishEnumSubFolders = 'FinishEnumSubFolders',
  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems'
}

export const requestAddRootFolder = () => ({
  type: ActionType.RequestAddRootFolder as ActionType.RequestAddRootFolder
})

export const finishAddRootFolder = (folder: Folder) => ({
  type: ActionType.FinishAddRootFolder as ActionType.FinishAddRootFolder,
  payload: {
    folder
  }
})

export const addRootFolder = () => (dispath: Dispatch) => {
  dispath(requestAddRootFolder())
  ipcRenderer.once(IPCKey.FinishSelectFolder, (ev: IpcMessageEvent, folder: Folder) => {
    dispath(finishAddRootFolder(folder))
  })

  ipcRenderer.send(IPCKey.RequestSelectFolder)
}

export const requestEnumSubFolders = () => ({
  type: ActionType.RequestEnumSubFolders as ActionType.RequestEnumSubFolders
})

export const finishEnumSubFolders = (folderPath: string, subFolders: Folder[]) => ({
  type: ActionType.FinishEnumSubFolders as ActionType.FinishEnumSubFolders,
  payload: {
    folderPath,
    subFolders
  }
})

export const enumSubFolders = (targetFolderPath: string) => (dispath: Dispatch) => {
  dispath(requestEnumSubFolders())
  ipcRenderer.once(IPCKey.FinishEnumSubFolders, (ev: IpcMessageEvent, folderPath: string, subFolders: Folder[]) => {
    dispath(finishEnumSubFolders(folderPath, subFolders))
  })

  ipcRenderer.send(IPCKey.RequestEnumSubFolders, targetFolderPath)
}

export const requestEnumItems = () => ({
  type: ActionType.RequestEnumItems
})

export const finishEnumItems = (items: FileItem[]) => ({
  type: ActionType.FinishEnumItems as typeof ActionType.FinishEnumItems,
  payload: {
    items
  }
})

export const enumItems = (targetFolderPath: string) => (dispath: Dispatch) => {
  dispath(requestEnumItems())
  ipcRenderer.once(IPCKey.FinishEnumItems, (ev: IpcMessageEvent, items: FileItem[]) => {
    dispath(finishEnumItems(items))
  })

  ipcRenderer.send(IPCKey.RequestEnumItems, targetFolderPath)
}
