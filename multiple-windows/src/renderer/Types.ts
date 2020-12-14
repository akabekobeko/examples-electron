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
   * Create a new window.
   */
  createNewWindow: () => Promise<void>

  /**
   * Gets all existing window identifiers.
   * @returns Collection of window identifiers.
   */
  getWindowIds: () => Promise<number[]>

  /**
   * Sends a message to the specified window.
   * @param targetWindowId The identifier of target window.
   * @param message Message to be sent
   */
  sendMessage: (targetWindowId: number, message: string) => Promise<void>

  /**
   * Occurs when a message is sent to its own window.
   * @param listener Event listener.
   */
  onUpdateMessage: (listener: (message: string) => void) => void

  /**
   * Occurs when the list of window identifiers is updated by new creation or deletion.
   * @param listener Event listener.
   */
  onUpdateWindowIds: (listener: (windowIds: number[]) => void) => void
}

/**
 * Flux action type is defined.
 */
export enum ActionType {
  CreateNewWindow = 'UpdateMessage',
  GetWindowIds = 'GetWindowIds',
  SendMessage = 'SendMessage',
  UpdateMessage = 'UpdateMessage',
  UpdateWindowIds = 'UpdateWindowIds'
}

/**
 * State of the application.
 */
export type AppState = {
  id: number
  windowIds: number[]
  message: string
}
