export type Folder = {
  name: string
  path: string
  expanded: boolean
  subFolders: Folder[]
}

export type FileItem = {
  name: string
  path: string
  size: number
  mode: number
  mtime: Date
  isDirectory: boolean
}

export type EnumItemsResult = {
  folderPath: string
  subFolders: Folder[]
  items: FileItem[]
}
