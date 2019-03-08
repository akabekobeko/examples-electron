import { IpcMessageEvent, OpenDialogOptions } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, Music, Artist } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer

/**
 * Select a music.
 * @param music Target music.
 */
export const selectMusic = (music: Music) => ({
  type: ActionType.SelectMusic as ActionType.SelectMusic,
  payload: {
    music
  }
})

/**
 * Select an artist.
 * @param artist Target artist.
 */
export const selectArtist = (artist: Artist) => ({
  type: ActionType.SlectArtist as ActionType.SlectArtist,
  payload: {
    artist
  }
})

/**
 * Request to import a music files
 */
export const requestImportMusic = () => ({
  type: ActionType.RequestImportMusic as ActionType.RequestImportMusic
})

/**
 * Notify that the request for importing music files has been completed.
 * @param paths Paths of imported file.
 */
export const finishImportMusic = (paths: string[]) => ({
  type: ActionType.FinishImportMusic as ActionType.FinishImportMusic,
  payload: {
    paths
  }
})

/**
 * Import a music files to list and database.
 */
export const importMusic = () => (dispatch: Dispatch) => {
  dispatch(requestImportMusic())

  ipcRenderer.on(
    IPCKey.FinishShowOpenDialog,
    (ev: IpcMessageEvent, paths: string[]) => {
      dispatch(finishImportMusic(paths))
    }
  )

  const options: OpenDialogOptions = {
    title: 'Select music files',
    filters: [
      {
        name: 'Musics',
        extensions: [
          'mp3',
          'mp2',
          'm2a',
          'm4a',
          'aac',
          'wav',
          'wma',
          'flac',
          'opus',
          'ogg'
        ]
      }
    ],
    properties: ['openFile', 'multiSelections']
  }

  ipcRenderer.send(IPCKey.RequestShowOpenDialog, options)
}

/**
 * Remove a music from list and database.
 * @param music Target music.
 */
export const removeMusic = (music: Music) => ({
  type: ActionType.RemoveMusic as ActionType.RemoveMusic,
  payload: {
    music
  }
})
