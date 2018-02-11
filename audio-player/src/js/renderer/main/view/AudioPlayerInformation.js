import React from 'react'
import PropTypes from 'prop-types'
import Util from '../../../Util.js'
import SpectrumAnalyzer from './AudioPlayerSpectrumAnalyzer.js'
import Styles from './AudioPlayerInformation.scss'

/**
 * Component for audio player information display.
 */
export default class AudioPlayerInformation extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {object} props Properties.
   */
  constructor (props) {
    super(props)

    /**
     * State of component.
     * @type {object}
     */
    this.state = {
      useSpectrumAnalyzer: false
    }

    this._onClickInfoDisplayBind       = this._onClickInfoDisplay.bind(this)
    this._onChangePlaybackPositionBind = this._onChangePlaybackPosition.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    const info = {
      title: 'Title',
      albumArtist: 'Album - Artist',
      currentTime: Math.round(this.props.audioPlayerStore.currentTime),
      currentTimeText: Util.secondsToString(this.props.audioPlayerStore.currentTime),
      duration: 0,
      durationText: '  0:00'
    }

    const music = this.props.music
    if (this.props.music) {
      info.title        = music.title
      info.albumArtist  = music.artist + ' - ' + music.album
      info.duration     = Math.round(music.duration)
      info.durationText = Util.secondsToString(music.duration)
      info.image        = music.image
    }

    const style = {display: this.state.useSpectrumAnalyzer ? 'none' : 'block'}

    return (
      <div className={Styles.information}>
        <div className={Styles.container}>
          <img className={Styles.image} src={info.image} />
          <SpectrumAnalyzer
            audioPlayerStore={this.props.audioPlayerStore}
            useSpectrumAnalyzer={this.state.useSpectrumAnalyzer}
            onClickInfoDisplay={this._onClickInfoDisplayBind} />
          <div
            style={style}
            onClick={this._onClickInfoDisplayBind}>
            <div className={Styles.title}>{info.title}</div>
            <div className={Styles.album}>{info.albumArtist}</div>
            <div className={Styles.playbacktime}>{info.currentTimeText}</div>
            <div className={Styles.duration}>{info.durationText}</div>
          </div>
          <div className={Styles.slider}>
            <input
              type="range"
              min={0}
              max={info.duration}
              value={info.currentTime}
              onChange={this._onChangePlaybackPositionBind} />
          </div>
        </div>
      </div>
    )
  }

  /**
   * Occurs when the playback position is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangePlaybackPosition (ev) {
    this.props.audioPlayerAction.seek(ev.target.value)
  }

  /**
   * Occurs when the information area is clicked.
   */
  _onClickInfoDisplay () {
    this.setState({useSpectrumAnalyzer: !(this.state.useSpectrumAnalyzer)})
  }
}

AudioPlayerInformation.propTypes = {
  audioPlayerStore: PropTypes.object,
  audioPlayerAction: PropTypes.object,
  music: PropTypes.object
}
