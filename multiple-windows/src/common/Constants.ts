/**
 * IPC keys.
 */
export enum IPCKey {
  RequestSendMessage = 'RequestSendMessage',
  FinishSendMessage = 'FinishSendMessage',

  RequestCreateNewWindow = 'RequestCreateNewWindow',
  RequestGetWindowIds = 'RequestGetWindowIds',

  UpdateWindowIds = 'UpdateWindowIds',
  UpdateMessage = 'UpdateMessage'
}
