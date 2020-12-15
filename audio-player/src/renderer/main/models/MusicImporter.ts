import { MusicMetadata } from '../../../common/Types'

/**
 * Show the import dialog.
 * @returns Path of the user selection files.
 */
const showImportDialog = async (): Promise<string[]> => {
  const result = await window.myAPI.showOpenDialog({
    properties: ['multiSelections', 'openFile']
  })
  return result.filePaths
}

/**
 * Read a metadata from the music file.
 * @param filePath Path of the music file.
 * @returns Asynchronous task, return the metadata of music.
 */
const readMusicMetadata = (filePath: string): Promise<MusicMetadata> =>
  window.myAPI.readMusicMetadata(filePath)

/**
 * Check that the specified music file is a supported.
 * @param filePath Path of the music file.
 * @returns Asynchronous task, return `true` if supported
 */
const isSupportedAudioFile = (filePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    let audio = new Audio(filePath)
    audio.addEventListener('loadedmetadata', () => resolve(true))
    audio.addEventListener('error', () => resolve(false))
  })
}

/**
 * Import a music metadata.
 * @returns Asynchronous task, return the metadata of musics.
 */
export const importMusicMetadata = async (): Promise<MusicMetadata[]> => {
  const results: MusicMetadata[] = []
  const paths = await showImportDialog()
  for (let path of paths) {
    if (!(await isSupportedAudioFile(path))) {
      continue
    }

    try {
      const metadata = await readMusicMetadata(path)
      if (metadata) {
        results.push(metadata)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return results
}
