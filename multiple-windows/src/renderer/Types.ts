/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    require: any
  }
}

/**
 * Flux action type is defined.
 */
export enum ActionType {
  CreateNewWindow = 'UpdateMessage',
  SendMessage = 'SendMessage',
  UpdateMessage = 'UpdateMessage',
  UpdateWindowIds = 'UpdateWindowIds',
  GetWindowIds = 'GetWindowIds'
}

/**
 * State of the application.
 */
export type AppState = {
  id: number
  windowIds: number[]
  message: string
}
