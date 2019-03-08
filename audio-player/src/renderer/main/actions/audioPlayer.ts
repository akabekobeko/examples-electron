import { ActionType, Music } from '../Types'

/**
 * Open an audio file for playback target.
 * @param music Target music.
 */
export const openWithPlay = (music: Music) => ({
  type: ActionType.OpenMusicWithPlay as ActionType.OpenMusicWithPlay,
  payload: {
    music
  }
})

/**
 * Play the current music.
 */
export const play = () => ({
  type: ActionType.Play as ActionType.Play
})

/**
 * Pause the currently playback audio.
 */
export const pause = () => ({
  type: ActionType.Pause as ActionType.Pause
})

/**
 * Stop the currently playback audio.
 */
export const stop = () => ({
  type: ActionType.Stop as ActionType.Stop
})

/**
 * Stop the currently playback audio.
 * @param position New position (Milliseconds).
 */
export const seek = (position: number) => ({
  type: ActionType.Seek as ActionType.Seek,
  payload: {
    position
  }
})

/**
 * Change the volume fro playback audio.
 * @param value New volume, range: `0` to `100`.
 */
export const changeVolume = (value: number) => ({
  type: ActionType.ChangeVolume as ActionType.ChangeVolume,
  payload: {
    value
  }
})
