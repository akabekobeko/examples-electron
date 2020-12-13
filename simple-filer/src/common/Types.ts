/** File or Folder information. */
export type FileItem = {
  /** Name of the item. */
  name: string
  /** Path of the item. */
  path: string
  /** File size of the item. */
  size: number
  /** Permission of the item. */
  mode: number
  /** Make time of the item. */
  mtime: string
  /** `true` if the item is a directory. */
  isDirectory: boolean
}

/** Result values of SelectFolder API. */
export type SelectFolderResult = {
  /** Name of the selected folder. */
  name: string
  /** Path of the selected folder. */
  folderPath: string
  /** Items on the selected folder. */
  items: FileItem[]
}
