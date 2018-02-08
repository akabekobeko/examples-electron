import { Action } from 'material-flux'

/**
 * Define keys for action.
 * @type {object}
 */
export const Keys = {
  open: 'AudioPlayerAction.open',
  play: 'AudioPlayerAction.play',
  pause: 'AudioPlayerAction.pause',
  stop: 'AudioPlayerAction.stop',
  seek: 'AudioPlayerAction.seek',
  volume: 'AudioPlayerAction.volume'
}

/**
 * Audio player actions.
 */
export default class AudioPlayerAction extends Action {
  /**
   * Open an audio file for playback target.
   *
   * @param {Music}   music    Music.
   * @param {boolean} withPlay If true to play a audio. Default is false.
   */
  open (music, withPlay) {
    this.dispatch(Keys.open, music, withPlay)
  }

  /**
   * Play the audio.
   */
  play () {
    this.dispatch(Keys.play)
  }

  /**
   * Pause the currently playback audio.
   */
  pause () {
    this.dispatch(Keys.pause)
  }

  /**
   * Stop the currently playback audio.
   */
  stop () {
    this.dispatch(Keys.stop)
  }

  /**
   * Stop the currently playback audio.
   *
   * @param {number} position New position (milliseconds).
   */
  seek (position) {
    this.dispatch(Keys.seek, position)
  }

  /**
   * Change the volume fro playback audio.
   *
   * @param {number} volume New volume (range: 0 - 100).
   */
  volume (volume) {
    this.dispatch(Keys.volume, volume)
  }
}
