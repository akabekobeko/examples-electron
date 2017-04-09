import React from 'react'
import PropTypes from 'prop-types'
import { PlaybackState } from '../../../common/Constants.js'

/**
 * Component for audio player controls.
 */
export default class AudioPlayerControl extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickPrevButtonBind = this._onClickPrevButton.bind(this)
    this._onClickPlayButtonBind = this._onClickPlayButton.bind(this)
    this._onClickNextButtonBind = this._onClickNextButton.bind(this)
    this._onChangeVolumeBind    = this._onChangeVolume.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    const playIcon = (this.props.playbackState === PlaybackState.Playing ? 'icon-pause' : 'icon-play')
    return (
      <div className="audio-player__container__control">
        <div className="audio-player__container__control__container">
          <div
            className="audio-player__container__control__container__button prev"
            onClick={this._onClickPrevButtonBind}>
            <i className="icon-prev" />
          </div>
          <div
            className="audio-player__container__control__container__button play"
            onClick={this._onClickPlayButtonBind}>
            <i className={playIcon} />
          </div>
          <div
            className="audio-player__container__control__container__button next"
            onClick={this._onClickNextButtonBind}>
            <i className="icon-next" />
          </div>
          <input
            type="range"
            className="audio-player__container__control__container__slider"
            min={0}
            max={100}
            value={this.props.volume}
            onChange={this._onChangeVolumeBind} />
        </div>
      </div>
    )
  }

  /**
   * Occurs when the play music button is clicked.
   */
  _onClickPlayButton () {
    switch (this.props.playbackState) {
      case PlaybackState.Stopped:
        this.props.audioPlayerAction.open(this.props.music, true)
        break

      case PlaybackState.Paused:
        this.props.audioPlayerAction.play()
        break

      case PlaybackState.Playing:
        this.props.audioPlayerAction.pause()
        break

      default:
        break
    }
  }

  /**
   * Occurs when the previource music button is clicked.
   */
  _onClickPrevButton () {
    this._playNextMusic(true)
  }

  /**
   * Occurs when the next music button is clicked.
   */
  _onClickNextButton () {
    this._playNextMusic()
  }

  /**
   * Occurs when the volume is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangeVolume (ev) {
    this.props.audioPlayerAction.volume(ev.target.value)
  }

  /**
   * Play the next music.
   *
   * @param {Boolean} prev If true to play a music. Default is false.
   */
  _playNextMusic (prev) {
    const music = this.props.getNextPlayMusic(prev)
    if (!(music)) {
      return
    }

    this.props.musicListAction.select(music)
    if (this.props.playbackState !== PlaybackState.Stopped) {
      this.props.audioPlayerAction.open(music, true)
    }
  }
}

AudioPlayerControl.propTypes = {
  audioPlayerAction: PropTypes.object,
  musicListAction: PropTypes.object,
  getNextPlayMusic: PropTypes.func,
  playbackState: PropTypes.number,
  volume: PropTypes.number,
  music: PropTypes.object
}
