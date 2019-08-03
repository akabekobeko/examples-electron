import { Dispatch } from 'redux'
import { IPCKey } from '../../../common/Constants'
import { ActionType, PlaybackState } from '../Types'
import MusicListManager from '../models/MusicListManager'
import AudioPlayer from '../models/AudioPlayer'
import Artist from '../models/Artist'
import Music from '../models/Music'
import { IpcRenderer } from 'electron'

/** Sends and receives messages with the main process. */
const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

/** Music ist. */
const musicList = new MusicListManager()

/** Audio player. */
const audioPlayer = new AudioPlayer()

/** Currently playing music. */
let playingMusic: Music | null = null

/** The player's playback time and the identifier for the spectrum notification timer. */
let timerId = 0

export const updateAppState = (error?: Error) => ({
  type: ActionType.UpdateAppState as ActionType.UpdateAppState,
  payload: {
    artists: musicList.artists,
    currentArtist: musicList.currentArtist,
    currentMusic: musicList.currentMusic,
    playingMusic,
    playbackState: audioPlayer.playbackState,
    currentTime: audioPlayer.currentTime,
    spectrums: audioPlayer.spectrums,
    volume: audioPlayer.volume
  },
  error
})

/**
 * Start the player's playback time and timer for spectrum notification.
 * @param dispatch Dispatcher.
 */
const timerStart = (dispatch: Dispatch<any>) => {
  timerId = window.setInterval(() => {
    if (!playingMusic) {
      timerStop()
      return
    }

    if (audioPlayer.currentTime < audioPlayer.duration) {
      dispatch(updateAppState())
      return
    }

    audioPlayer.stop()
    const nextMusic = musicList.getNextMusic(playingMusic)
    if (nextMusic) {
      musicList.selectMusic(nextMusic)
      dispatch(openWithPlay(nextMusic))
    } else {
      playingMusic = null
      timerStop()
      dispatch(updateAppState())
    }
  }, 200)
}

/**
 * Stop the player's playback time and the timer for spectrum notification.
 */
const timerStop = () => {
  window.clearInterval(timerId)
  timerId = 0
}

/**
 * Load the music list from database.
 */
export const loadMusicList = () => (dispatch: Dispatch) => {
  musicList
    .load()
    .then(() => dispatch(updateAppState()))
    .catch((error) => dispatch(updateAppState(error)))
}

/**
 * Import a music files to list and database.
 */
export const importMusic = () => (dispatch: Dispatch) => {
  musicList
    .import()
    .then(() => dispatch(updateAppState()))
    .catch((err) => dispatch(updateAppState(err)))
}

/**
 * Select artist
 * @param artist Target artist.
 */
export const selectArtist = (artist: Artist) => {
  musicList.selectArtist(artist)
  return updateAppState()
}

/**
 * Select music
 * @param music Target music.
 */
export const selectMusic = (music: Music) => {
  musicList.selectMusic(music)
  return updateAppState()
}

/**
 * Remove music
 * @param music Target music.
 */
export const removeMusic = () => (dispatch: Dispatch) => {
  if (!musicList.currentMusic) {
    return
  }

  if (playingMusic && playingMusic.id === musicList.currentMusic.id) {
    return
  }

  musicList
    .remove(musicList.currentMusic)
    .then(() => dispatch(updateAppState()))
    .catch((err) => dispatch(updateAppState(err)))
}

/**
 * Open and play music.
 * @param music Target music.
 */
export const openWithPlay = (music: Music) => (dispatch: Dispatch) => {
  audioPlayer
    .open(music.filePath)
    .then(() => {
      return audioPlayer.play()
    })
    .then(() => {
      playingMusic = music
      timerStart(dispatch)
      dispatch(updateAppState())
    })
    .catch((err) => dispatch(updateAppState(err)))
}

/**
 * Select the previous or next music.
 * If music is playing, it will play new things again.
 */
export const next = (isNext: boolean = true) => (dispatch: Dispatch<any>) => {
  if (playingMusic) {
    const music = musicList.getNextMusic(playingMusic, isNext)
    if (music) {
      audioPlayer.stop()
      dispatch(openWithPlay(music))
    }
  } else if (musicList.currentMusic) {
    const music = musicList.getNextMusic(musicList.currentMusic, isNext)
    if (music) {
      dispatch(selectMusic(music))
    }
  }
}

/**
 * Play the music.
 */
export const play = () => (dispatch: Dispatch<any>) => {
  if (audioPlayer.playbackState === PlaybackState.Stopped) {
  }

  audioPlayer.play().then(() => {
    timerStart(dispatch)
    dispatch(updateAppState())
  })
}

/**
 * Pauses music playback.
 */
export const pause = () => {
  audioPlayer.pause()
  timerStop()
  return updateAppState()
}

/**
 * Pauses music playback.
 */
export const stop = () => {
  audioPlayer.stop()
  timerStop()
  return updateAppState()
}

/**
 * Seek the audio playback position.
 * @param position New position.
 */
export const seek = (position: number) => {
  audioPlayer.currentTime = position
  return updateAppState()
}

/**
 * Change the audio volume.
 * @param value Value of volume.
 */
export const changeVolume = (value: number) => {
  audioPlayer.volume = value
  return updateAppState()
}

/**
 * Show effector window.
 */
export const showEffector = () => {
  ipcRenderer.send(IPCKey.RequestShowEffector)
  return {
    type: ActionType.ShowEffector
  }
}
