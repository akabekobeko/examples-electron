/**
 * IPC keys.
 */
export enum IPCKey {
  RequestShowOpenDialog = 'RequestShowOpenDialog',
  FinishShowOpenDialog = 'FinishShowOpenDialog',

  RequestShowSaveDialog = 'RequestShowSaveDialog',
  FinishShowSaveDialog = 'FinishShowSaveDialog',

  RequestShowMessageBox = 'RequestShowMessageBox',
  FinishShowMessageBox = 'FinishShowMessageBox',

  RequestSendMessage = 'RequestSendMessage',
  FinishSendMessage = 'FinishSendMessage',

  RequestCreateNewWindow = 'RequestCreateNewWindow',
  RequestGetWindowIds = 'RequestGetWindowIds',

  UpdateWindowIds = 'UpdateWindowIds',
  UpdateMessage = 'UpdateMessage'
}
