import { promises as Fs } from 'fs'
import Path from 'path'
import { app } from 'electron'
import { FileItem } from '../common/TypeAliases';

/**
 * Get the file or folder informations.
 * @param path Path of the file or folder.
 * @returns Asyncronized task.
 */
export const GetFileInfo = async (path: string): Promise<FileItem> => {
  const stat = await Fs.stat(path)
  return {
    name: Path.basename(path),
    path: path,
    size: stat.size,
    mode: stat.mode,
    mtime: stat.mtime,
    isDirectory: stat.isDirectory(),
    children: []
  }
}

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
    items.push(await GetFileInfo(Path.resolve(folder, file)))
  }

  return items
}