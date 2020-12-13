import { contextBridge, ipcRenderer } from 'electron'
import { IPCKey } from './Constants'
import { SelectFolderResult, FileItem } from './Types'

contextBridge.exposeInMainWorld('myAPI', {
  selectFolder: async (): Promise<SelectFolderResult | undefined> =>
    await ipcRenderer.invoke(IPCKey.SelectFolder),

  enumItems: async (folderPath: string): Promise<FileItem[]> =>
    await ipcRenderer.invoke(IPCKey.EnumItems, folderPath),

  openItem: async (itemPath: string): Promise<string> =>
    await ipcRenderer.invoke(IPCKey.OpenItem, itemPath)
})
