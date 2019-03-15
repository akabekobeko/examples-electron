import { Dispatch } from 'redux'
import { ActionType } from '../Types'
import MusicListManager from '../models/MusicListManager'
import AudioPlayer from '../models/AudioPlayer'
import Music from '../models/Music'
import Artist from '../models/Artist'

/** Music ist. */
export const musicList = new MusicListManager()

/** Audio player. */
export const audioPlayer = new AudioPlayer()

/** Currently playing music. */
let playingMusic: Music | null = null

/**
 * Returns the result of `loadMusicList`.
 * @param error Error information.
 * @returns Results.
 */
export const loadMusicListResult = (error?: Error) => ({
  type: ActionType.LoadMusicList as ActionType.LoadMusicList,
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
    .then(() => dispatch(loadMusicListResult()))
    .catch((error) => dispatch(loadMusicListResult(error)))
}

/**
 * Returns the result of `importMusic`.
 * @param error Error information.
 * @returns Results.
 */
export const importMusicResult = (error?: Error) => ({
  type: ActionType.ImportMusic as ActionType.ImportMusic,
  payload: {
    artists: musicList.artists,
    currentArtist: musicList.currentArtist,
    currentMusic: musicList.currentMusic
  },
  error
})

/**
 * Import a music files to list and database.
 */
export const importMusic = () => (dispatch: Dispatch) => {
  musicList
    .import()
    .then(() => dispatch(importMusicResult()))
    .catch((error) => dispatch(importMusicResult(error)))
}

/**
 * Select artist
 * @param artist Target artist.
 */
export const selectArtist = (artist: Artist) => {
  musicList.selectArtist(artist)
  return {
    type: ActionType.SeletcMusic as ActionType.SeletcMusic,
    payload: {
      currentArtist: artist
    }
  }
}

/**
 * Select music
 * @param music Target music.
 */
export const selectMusic = (music: Music) => {
  musicList.selectMusic(music)
  return {
    type: ActionType.SeletcMusic as ActionType.SeletcMusic,
    payload: {
      currentMusic: music
    }
  }
}

/**
 * Remove music
 * @param music Target music.
 */
export const removeMusic = () => {
  const music = musicList.currentMusic
  if (music) {
    if (playingMusic && playingMusic.id === music.id) {
      audioPlayer.stop()
      playingMusic = null
    }

    musicList.remove(music)
  }

  return {
    type: ActionType.RemoveMusic as ActionType.RemoveMusic,
    payload: {
      playingMusic,
      artists: musicList.artists,
      currentArtist: musicList.currentArtist,
      currentMusic: musicList.currentMusic
    }
  }
}

/**
 * Returns the result of `openWithPlay`.
 * @param error Error information.
 * @returns Results.
 */
export const openWithPlayResult = (error?: Error) => ({
  type: ActionType.OpenWithPlay as ActionType.OpenWithPlay,
  payload: {
    playbackState: audioPlayer.playbackState,
    playingMusic,
    currentTime: audioPlayer.currentTime,
    spectrums: audioPlayer.spectrums,
    volume: audioPlayer.volume
  },
  error
})

/**
 * Open and play music.
 * @param music Target music.
 */
export const openWithPlay = (music: Music) => (dispatch: Dispatch) => {
  audioPlayer
    .open(music.filePath)
    .then(() => {
      if (audioPlayer.play()) {
        playingMusic = music
        dispatch(openWithPlayResult())
      } else {
        dispatch(openWithPlayResult(new Error('Failed to play music.')))
      }
    })
    .catch((error) => {
      dispatch(openWithPlayResult(error))
    })
}

/**
 * Select the previous or next music.
 * If music is playing, it will play new things again.
 */
export const next = (isNext: boolean = true) => {
  if (playingMusic) {
    const music = musicList.getNextMusic(playingMusic, isNext)
    if (music) {
      audioPlayer.stop()
      openWithPlay(music)
    }
  } else if (musicList.currentMusic) {
    const music = musicList.getNextMusic(musicList.currentMusic, isNext)
    if (music) {
      selectMusic(music)
    }
  }
}

/**
 * Play the music.
 */
export const play = () => {
  audioPlayer.play()
  return {
    type: ActionType.Play as ActionType.Play,
    payload: {
      playbackState: audioPlayer.playbackState,
      currentTime: audioPlayer.currentTime,
      spectrums: audioPlayer.spectrums
    }
  }
}

/**
 * Pauses music playback.
 */
export const pause = () => {
  audioPlayer.pause()
  return {
    type: ActionType.Pause as ActionType.Pause,
    payload: {
      playbackState: audioPlayer.playbackState,
      currentTime: audioPlayer.currentTime,
      spectrums: null
    }
  }
}

/**
 * Pauses music playback.
 */
export const stop = () => {
  audioPlayer.stop()
  return {
    type: ActionType.Stop as ActionType.Stop,
    payload: {
      playbackState: audioPlayer.playbackState,
      currentTime: audioPlayer.currentTime,
      spectrums: null
    }
  }
}

/**
 * Change the audio volume.
 * @param value Value of volume.
 */
export const changeVolume = (value: number) => {
  audioPlayer.volume = value
  return {
    type: ActionType.ChangeVolume as ActionType.ChangeVolume,
    payload: {
      volume: audioPlayer.volume
    }
  }
}

/**
 * Get a currently playback time and audio spectrums.
 */
export const getPlayTimeAndSpectrums = () => ({
  type: ActionType.GetPlayTimeAndSpectrums as ActionType.GetPlayTimeAndSpectrums,
  payload: {
    currentTime: audioPlayer.currentTime,
    spectrums: audioPlayer.spectrums
  }
})
