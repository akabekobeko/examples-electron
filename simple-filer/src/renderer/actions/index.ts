import { ipcRenderer, IpcMessageEvent } from 'electron';
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { FileItem } from '../../common/TypeAliases';

export enum ActionType {
  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems'
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
