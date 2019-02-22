/**
 * The key name that is the channel of the IPC message..
 */
export enum IPCKey {
  RequestShowOpenDialog = 'RequestShowOpenDialog',
  FinishShowOpenDialog = 'FinishShowOpenDialog',

  RequestShowSaveDialog = 'RequestShowSaveDialog',
  FinishShowSaveDialog = 'FinishShowSaveDialog',

  RequestShowMessageBox = 'RequestShowMessageBox',
  FinishShowMessageBox = 'FinishShowMessageBox',

  RequestSelectFolder = 'RequestSelectFolder',
  FinishSelectFolder = 'FinishSelectFolder',

  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems',

  RequestOepnItem = 'RequestOepnItem',
  FinishOpenItem = 'FinishOpenItem'
}
