import { FileType } from './Constants'

/**
 * Hierarchical structure information of folders.
 */
export type Folder = {
  name: string
  path: string
  expanded: boolean
  subFolders: Folder[]
}

/**
 * Item informations per folder
 */
export type FolderItem = {
  folderPath: string
  items: FileItem[]
}

/**
 * File or Folder information
 */
export type FileItem = {
  name: string
  path: string
  size: number
  mode: number
  mtime: string
  isDirectory: boolean
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
