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
  RequestShowURL = 'RequestShowURL',
  FinishShowURL = 'FinishShowURL',
  UpdateTime = 'UpdateTime'
}

/**
 * State of the application.
 */
export type AppState = {
  url: string
  requestingShowURL: boolean
  dateTime: string
}
