import { FileItem } from '../../common/Types'
import { FileViewItem, FileType, AppState } from '../Types'
import { finishEnumItems } from '../actions/index'

/**
 * Get the type of file or folder.
 * @param item Source item.
 * @returns Type of file.
 */
const getType = (item: FileItem): FileType => {
  if (item.isDirectory) {
    return FileType.Folder
  }

  const ext = /(?:\.([^.]+))?$/.exec(item.name) || ['']
  switch (ext[0]) {
    case '.txt':
    case '.md':
    case '.html':
    case '.xml':
    case '.css':
    case '.js':
    case '.jsx':
    case '.json':
    case '.yml':
    case '.php':
    case '.java':
    case '.rb':
    case '.pl':
    case '.py':
    case '.ts':
    case '.tsx':
      return FileType.Text

    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
    case '.svg':
    case '.ico':
    case '.icns':
      return FileType.Image

    case '.mp3':
    case '.aac':
      return FileType.Audio

    case '.avi':
    case '.mp4':
      return FileType.Video

    default:
      return FileType.File
  }
}

/**
 * Get the display size string from the size of the bytes.
 * @param byteSize Size of the bytes
 * @returns Display size.
 */
const getSizeString = (byteSize: number): string => {
  if (byteSize === 0) {
    return '--'
  }

  const k = 1024
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const value = parseInt(
    Math.floor(Math.log(byteSize) / Math.log(k)).toString()
  )
  const size = (byteSize / Math.pow(k, value)) * 10

  return Math.ceil(size) / 10 + ' ' + units[value]
}

/**
 * Get permission string from a bit-field describing the file type and mode (fs.stat.mode).
 * @param item Source item.
 * @returns Permission string.
 */
const getPermissionString = (item: FileItem): string => {
  const S_IRUSR = 0x0400
  const S_IWUSR = 0x0200
  const S_IXUSR = 0x0100
  const S_IRGRP = 0x0040
  const S_IWGRP = 0x0020
  const S_IXGRP = 0x0010
  const S_IROTH = 0x0004
  const S_IWOTH = 0x0002
  const S_IXOTH = 0x0001

  const str =
    (item.isDirectory ? 'd' : '-') +
    (item.mode & S_IRUSR ? 'r' : '-') +
    (item.mode & S_IWUSR ? 'w' : '-') +
    (item.mode & S_IXUSR ? 'x' : '-') +
    (item.mode & S_IRGRP ? 'r' : '-') +
    (item.mode & S_IWGRP ? 'w' : '-') +
    (item.mode & S_IXGRP ? 'x' : '-') +
    (item.mode & S_IROTH ? 'r' : '-') +
    (item.mode & S_IWOTH ? 'w' : '-') +
    (item.mode & S_IXOTH ? 'x' : '-')

  return str
}

/**
 * Convert files and folder information for display.
 * @param items Source items.
 * @returns Converted items.
 */
const itemToViewItems = (items: FileItem[]): FileViewItem[] => {
  const viewItems: FileViewItem[] = []
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

  items.forEach((item) => {
    viewItems.push({
      item: item,
      type: getType(item),
      size: item.isDirectory ? '' : getSizeString(item.size),
      permission: getPermissionString(item),
      date: new Date(item.mtime).toLocaleDateString(
        navigator.language,
        dateOptions
      )
    })
  })

  return viewItems
}

/**
 * Group items for display.
 * @param items Items.
 * @returns Items sorted by group.
 */
const groupingItems = (items: FileItem[]): FileItem[] => {
  const dirs = items
    .filter((item) => item.isDirectory)
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))

  const files = items
    .filter((item) => !item.isDirectory)
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))

  return dirs.concat(files)
}

/**
 * Check the result of finishEnumItems and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumItems.
 * @returns New state.
 */
export const checkEnumItems = (
  state: AppState,
  action: ReturnType<typeof finishEnumItems>
): AppState => {
  return Object.assign({}, state, {
    currentFolder: {
      treeId: action.payload.folder.treeId,
      path: action.payload.folder.path,
      isRoot: action.payload.folder.isRoot
    },
    items: itemToViewItems(groupingItems(action.payload.items))
  })
}

export default checkEnumItems
