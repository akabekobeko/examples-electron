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
 * File or Folder information
 */
export type FileItem = {
  name: string
  path: string
  size: number
  mode: number
  mtime: Date
  isDirectory: boolean
}

/**
 * Item informations per folder
 */
export type FolderItem = {
  folderPath: string
  items: FileItem[]
}

export type EnumItemsResult = {
  folderPath: string
  subFolders: Folder[]
  items: FileItem[]
}
