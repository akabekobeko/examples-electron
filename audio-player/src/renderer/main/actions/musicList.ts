import { Dispatch } from 'redux'
import { ActionType, MusicSelectPosition, AppState } from '../Types'
import Music from '../models/Music'
import Artist from '../models/Artist'
import MusicListManager from '../models/MusicListManager'

/** Music ist. */
const musicList = new MusicListManager()

/**
 * Update the state of music list.
 * @param error Error information.
 */
export const updateMusicList = (error?: Error) => ({
  type: ActionType.UpdateMusicList as ActionType.UpdateMusicList,
  payload: {
    artists: musicList.artists,
    currentArtist: musicList.currentArtist,
    currentMusic: musicList.currentMusic
  },
  error
})

/**
 * Load the music list from database.
 */
export const loadMusicList = () => (dispatch: Dispatch) => {
  musicList
    .load()
    .then(() => dispatch(updateMusicList()))
    .catch((err) => dispatch(updateMusicList(err)))
}

/**
 * Import a music files to list and database.
 */
export const importMusic = () => (dispatch: Dispatch) => {
  musicList
    .import()
    .then(() => dispatch(updateMusicList()))
    .catch((err) => dispatch(updateMusicList(err)))
}

/**
 * Remove a music from list and database.
 * @param music Target music.
 */
export const removeMusic = (music: Music) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  // Ignore the currently playing music
  const playingMusic = getState().playingMusic
  if (playingMusic && playingMusic.id === music.id) {
    return updateMusicList()
  }

  musicList
    .remove(music)
    .then(() => dispatch(updateMusicList()))
    .catch((err) => dispatch(updateMusicList(err)))
}

/**
 * Select a music.
 * @param music Target music.
 */
export const selectMusic = (
  music: Music,
  position: MusicSelectPosition = MusicSelectPosition.Current
) => {
  musicList.selectMusic(music, position)
  return updateMusicList()
}

/**
 * Select an artist.
 * @param artist Target artist.
 */
export const selectArtist = (artist: Artist) => {
  musicList.selectArtist(artist)
  return updateMusicList()
}
