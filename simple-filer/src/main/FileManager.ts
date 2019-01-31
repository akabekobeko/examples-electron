import { promises as Fs } from 'fs'
import Path from 'path'
import { app } from 'electron'
import { FileItem } from '../common/TypeAliases';

/**
 * Get the files and folders information in the specified folder.
 * If the argument is omitted, it targets the user's home directory.
 * @param folder The path of the target folder.
 * @returns Asyncronized task.
 */
export const EnumFiles = async (folder?: string): Promise<FileItem[]> => {
  const items: FileItem[] = []
  if (!folder) {
    folder = app.getPath('home')
  }

  const files = await Fs.readdir(folder)
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