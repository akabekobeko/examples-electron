import { Dispatch } from 'redux'
import { ActionType } from '../Types'
import Music from '../models/Music'
import AudioPlayer from '../models/AudioPlayer'

/** Audio player. */
const player = new AudioPlayer()

/** Currently playing music. */
let playingMusic: Music | null = null

/** Timer identifier for notifying the player status. */
let timerId = 0

/**
 * Update the state of audio player.
 * @param error Error information.
 */
export const updatePlayerState = (error?: Error) => ({
  type: ActionType.UpdatePlayerState as ActionType.UpdatePlayerState,
  payload: {
    playbackState: player.playbackState,
    currentTime: player.currentTime,
    volume: player.volume,
    spectrums: player.spectrums,
    playingMusic
  },
  error
})

/**
 * Open an audio file for playback target.
 * @param music Target music.
 */
export const openWithPlay = (music: Music) => (dispatch: Dispatch) => {
  player
    .open(music.filePath)
    .then(() => {
      if (player.play()) {
        playingMusic = music
        timerId = window.requestAnimationFrame(() => updatePlayerState())
        dispatch(updatePlayerState())
      } else {
        dispatch(updatePlayerState(new Error('Failed to play music.')))
      }
    })
    .catch((err) => dispatch(updatePlayerState(err)))
}

/**
 * Play the current music.
 */
export const play = () => (dispatch: Dispatch) => {
  if (player.play()) {
    timerId = window.requestAnimationFrame(() => updatePlayerState())
    dispatch(updatePlayerState())
  } else {
    dispatch(updatePlayerState(new Error('Failed to play music.')))
  }
}

/**
 * Pause the currently playback audio.
 */
export const pause = () => {
  if (player.pause()) {
    window.cancelAnimationFrame(timerId)
    return updatePlayerState()
  }

  return updatePlayerState(new Error('Failed to pause music.'))
}

/**
 * Stop the currently playback audio.
 */
export const stop = () => {
  if (player.stop()) {
    window.cancelAnimationFrame(timerId)
    playingMusic = null
    return updatePlayerState()
  }

  return updatePlayerState(new Error('Failed to stop music.'))
}

/**
 * Stop the currently playback audio.
 * @param position New position (Milliseconds).
 */
export const seek = (position: number) => {
  player.currentTime = position
  return updatePlayerState()
}

/**
 * Change the volume fro playback audio.
 * @param value New volume, range: `0` to `100`.
 */
export const changeVolume = (value: number) => {
  player.volume = value
  return updatePlayerState()
}
