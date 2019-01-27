import { promises as Fs } from 'fs'
import Path from 'path'
import { FileItem } from '../common/TypeAliases';

export const EnumFiles = async (folder: string) => {
  const files = await Fs.readdir(folder)
  const items: FileItem[] = []

  for (let file of files) {
    const path = Path.resolve(folder, file)
    const stat = await Fs.stat(path)

    items.push({
      name: file,
      path: path,
      size: stat.size,
      mode: stat.mode,
      mtime: stat.mtime,
      isDirectory: stat.isDirectory()
    })
  }

  return items
}