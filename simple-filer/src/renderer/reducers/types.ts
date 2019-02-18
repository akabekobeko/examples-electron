import { Folder } from '../../common/Types'
import { FileViewItem } from '../Types'

export type AppState = {
  currentFolder: {
    path: string
    isRoot: boolean
  }
  folders: Folder[]
  items: FileViewItem[]
}
