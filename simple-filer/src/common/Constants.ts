/**
 * The key name that is the channel of the IPC message..
 */
export enum IPCKey {
  RequestSelectFolder = 'RequestSelectFolder',
  FinishSelectFolder = 'FinishSelectFolder',

  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems',

  RequestOepnItem = 'RequestOepnItem',
  FinishOpenItem = 'FinishOpenItem'
}
