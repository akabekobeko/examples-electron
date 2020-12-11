import { contextBridge, ipcRenderer } from 'electron'
import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
  MessageBoxOptions,
  MessageBoxReturnValue
} from 'electron/main'
import { IPCKey } from './Constants'

contextBridge.exposeInMainWorld('myAPI', {
  showOpenDialog: async (
    options: OpenDialogOptions
  ): Promise<OpenDialogReturnValue> =>
    await ipcRenderer.invoke(IPCKey.ShowOpenDialog, options),

  showSaveDialog: async (
    options: SaveDialogOptions
  ): Promise<SaveDialogReturnValue> =>
    await ipcRenderer.invoke(IPCKey.ShowSaveDialog, options),

  showMessageBox: async (
    options: MessageBoxOptions
  ): Promise<MessageBoxReturnValue> =>
    await ipcRenderer.invoke(IPCKey.ShowMessageBox, options),

  showURL: async (url: string): Promise<void> =>
    await ipcRenderer.invoke(IPCKey.ShowURL, url)
})
