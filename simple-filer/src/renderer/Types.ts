import { FileItem } from '../common/Types'

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
