import { IpcMessageEvent } from 'electron'
import { IPCKey } from '../../../common/Constants'
import { ImportMusicDialogOption } from '../Constants'
import { MusicMetadata } from '../../../common/Types'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Show the import dialog.
 * @returns Asynchronous task, retuen the path of user selection.
 */
const showImportDialog = (): Promise<string[]> => {
  return new Promise((resolve) => {
    ipcRenderer.on(
      IPCKey.FinishShowOpenDialog,
      (ev: IpcMessageEvent, paths: string[]) => {
        resolve(paths)
      }
    )

    ipcRenderer.send(IPCKey.RequestShowOpenDialog, ImportMusicDialogOption)
  })
}

/**
 * Read a metadata from the music file.
 * @param filePath Path of the music file.
 * @returns Asynchronous task, return the metadata of music.
 */
const readMusicMetadata = (
  filePath: string
): Promise<MusicMetadata | undefined> => {
  return new Promise((resolve) => {
    ipcRenderer.on(
      IPCKey.FinishReadMusicMetadata,
      (ev: IpcMessageEvent, metadata: MusicMetadata | undefined) => {
        resolve(metadata)
      }
    )

    ipcRenderer.send(IPCKey.RequestReadMusicMetadata, filePath)
  })
}

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

    const metadata = await readMusicMetadata(path)
    if (metadata) {
      results.push(metadata)
    }
  }

  return results
}
