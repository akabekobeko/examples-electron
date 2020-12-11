import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
  MessageBoxOptions,
  MessageBoxReturnValue
} from 'electron/main'

/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    myAPI: MyAPI
  }
}

/**
 * Provides an application-specific API.
 */
export type MyAPI = {
  /**
   * Shows the file open dialog.
   * @param options Options of the showOpenDialog API on Electron.
   * @returns Result of the dialog operation.
   */
  showOpenDialog: (options: OpenDialogOptions) => Promise<OpenDialogReturnValue>

  /**
   * Shows the data save dialog.
   * @param options Options of the showSaveDialog API on Electron.
   * @returns Result of the dialog operation.
   */
  showSaveDialog: (options: SaveDialogOptions) => Promise<SaveDialogReturnValue>

  /**
   * Shows the message box.
   * @param options Options of the showMessageBox API on Electron.
   * @returns Result of the message box operation.
   */
  showMessageBox: (options: MessageBoxOptions) => Promise<MessageBoxReturnValue>

  /**
   * Show URL.
   * @param url URL.
   */
  showURL: (url: string) => Promise<void>
}

/**
 * Flux action type is defined.
 */
export enum ActionType {
  RequestShowURL = 'RequestShowURL',
  FinishShowURL = 'FinishShowURL',
  UpdateTime = 'UpdateTime',

  RequestShowOpenDialog = 'RequestShowOpenDialog',
  FinishShowOpenDialog = 'FinishShowOpenDialog',
  RequestShowSaveDialog = 'RequestShowSaveDialog',
  FinishShowSaveDialog = 'FinishShowSaveDialog',
  RequestShowMessageBox = 'RequestShowMessageBox',
  FinishShowMessageBox = 'FinishShowMessageBox'
}

/**
 * State of the application.
 */
export type AppState = {
  url: string
  requestingShowURL: boolean
  dateTime: string
}
