export type FileItem = {
  name: string
  path: string
  size: number
  mode: number
  mtime: Date
  isDirectory: boolean,
  children: FileItem[]
}
