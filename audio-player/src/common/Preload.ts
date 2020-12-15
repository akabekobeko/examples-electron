import { contextBridge, ipcRenderer } from 'electron'
import { OpenDialogOptions, OpenDialogReturnValue } from 'electron/main'
import { IPCKey } from './Constants'
import { MusicMetadata } from './Types'

contextBridge.exposeInMainWorld('myAPI', {
  showOpenDialog: async (
    options: OpenDialogOptions
  ): Promise<OpenDialogReturnValue> =>
    await ipcRenderer.invoke(IPCKey.ShowOpenDialog, options),

  readMusicMetadata: async (filePath: string): Promise<MusicMetadata> =>
    await ipcRenderer.invoke(IPCKey.ReadMusicMetadata, filePath),

  showEffector: (): Promise<void> => ipcRenderer.invoke(IPCKey.ShowEffector),

  applyEqualizerState: (connect: boolean, gains: number[]): Promise<void> =>
    ipcRenderer.invoke(IPCKey.ApplyEqualizerState, connect, gains)
})
