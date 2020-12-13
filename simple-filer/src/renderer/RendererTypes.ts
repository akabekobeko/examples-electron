import { SelectFolderResult, FileItem } from '../common/Types'

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
   * Select the target folder.
   * @returns Path of the selected folder. `undefined` if not selected.
   */
  selectFolder: () => Promise<SelectFolderResult | undefined>

  /**
   * Enumerates the items in the specified folder.
   * @param folderPath Path of the target folder.
   */
  enumItems: (folderPath: string) => Promise<FileItem[]>

  /**
   * Opens the specified item in the application associated with the system (shell).
   * @param itemPath Path of the target item.
   */
  openItem: (itemPath: string) => Promise<string>
}

/**
 * Type of file.
 */
export enum FileType {
  Text = 'Text',
  Image = 'Image',
  Audio = 'Audio',
  Video = 'Video',
  File = 'File',
  Folder = 'Folder'
}

/**
 * File or Folder information for display.
 */
export type FileViewItem = {
  item: FileItem
  type: FileType
  size: string
  permission: string
  date: string
}

/**
 * Hierarchical structure information of folders.
 */
export type Folder = {
  treeId: number
  isRoot: boolean
  name: string
  path: string
  subFolders: Folder[]
}

/**
 * Information on the currently selected folder.
 */
export type CurrentFolder = {
  treeId: number
  path: string
  isRoot: boolean
}

/**
 * State of the application.
 */
export type AppState = {
  currentFolder: CurrentFolder
  currentItem?: FileViewItem
  folders: Folder[]
  items: FileViewItem[]
}

/**
 * Flux action type is defined.
 */
export enum ActionType {
  RequestRegisterRootFolder = 'RequestRegisterRootFolder',
  FinishRegisterRootFolder = 'FinishRegisterRootFolder',
  RequestUnregisterRootFolder = 'RequestUnregisterRootFolder',
  RequestEnumSubFolders = 'RequestEnumSubFolders',
  FinishEnumSubFolders = 'FinishEnumSubFolders',
  RequestEnumItems = 'RequestEnumItems',
  FinishEnumItems = 'FinishEnumItems',
  RequestSelectItem = 'RequestSelectItem',
  RequestOpenItem = 'RequestOpenItem'
}
