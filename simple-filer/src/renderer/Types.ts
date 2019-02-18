import { Folder, FileItem } from '../common/Types'
import { FileType } from '../common/Constants'

/**
 * Folder tree information for display.
 */
export type FolderViewItem = {
  item: Folder
  rootId: number
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
