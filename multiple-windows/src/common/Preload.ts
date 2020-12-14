import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererEvent } from 'electron/main'
import { IPCKey } from './Constants'

contextBridge.exposeInMainWorld('myAPI', {
  sendMessage: async (targetWindowId: number, message: string): Promise<void> =>
    await ipcRenderer.invoke(IPCKey.SendMessage, targetWindowId, message),

  createNewWindow: async (): Promise<void> =>
    await ipcRenderer.invoke(IPCKey.CreateNewWindow),

  getWindowIds: async (): Promise<number[]> =>
    await ipcRenderer.invoke(IPCKey.GetWindowIds),

  onUpdateMessage: (listener: (message: string) => void) =>
    ipcRenderer.on(
      IPCKey.UpdateMessage,
      (ev: IpcRendererEvent, message: string) => listener(message)
    ),

  onUpdateWindowIds: (listener: (windowIds: number[]) => void) =>
    ipcRenderer.on(
      IPCKey.UpdateWindowIds,
      (ev: IpcRendererEvent, windowIds: number[]) => listener(windowIds)
    )
})
