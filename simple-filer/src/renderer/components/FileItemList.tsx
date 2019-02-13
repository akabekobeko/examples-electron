import React from 'react'
import { list, header_right, value_size, value_permission } from './FileItemList.scss'
import { FileItem } from '../../common/TypeAliases'

type Props = {
  items: FileItem[]
}

const getType = (item: FileItem) => {
  if (item.isDirectory) {
    return 'Folder'
  }

  const ext = /(?:\.([^.]+))?$/.exec(item.name) || ''
  switch (ext) {
    case '.txt':
      return 'Text'
    case '.md':
      return 'Markdown'
    case '.html':
      return 'HTML'
    case '.css':
      return 'Style Sheet'
    case '.js':
      return 'JavaScript'
    case '.jpeg':
      return 'JPEG'
    case '.png':
      return 'PNG'
    case '.gif':
      return 'GIF'
    case '.mp3':
      return 'MPEG3'
    case '.mp4':
      return 'MPEG4'
    case '.aac':
      return 'AAC'
    default:
      return 'File'
  }
}

const bytesToSize = (bytes: number): string => {
  if (bytes === 0) {
    return '--'
  }

  const k = 1024
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const value = parseInt(Math.floor(Math.log(bytes) / Math.log(k)).toString())
  const size = (bytes / Math.pow(k, value)) * 10

  return Math.ceil(size) / 10 + ' ' + units[value]
}

const getPermissionString = (item: FileItem) => {
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

const FileItemList: React.FC<Props> = ({ items }) => (
  <div className={list}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className={header_right}>Size</th>
          <th>Permission</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{getType(item)}</td>
            <td className={value_size}>{item.isDirectory ? '-' : bytesToSize(item.size)}</td>
            <td className={value_permission}>{getPermissionString(item)}</td>
            <td>{item.mtime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default FileItemList
