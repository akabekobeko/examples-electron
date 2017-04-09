import React from 'react'
import PropTypes from 'prop-types'
import { PlaybackState } from '../../../common/Constants.js'
import AudioPlayerControl from './AudioPlayerControl.js'
import AudioPlayerToolbar from './AudioPlayerToolbar.js'
import AudioPlayerInfo from './AudioPlayerInfo.js'

/**
 * Component for audio player controls.
 */
export default class AudioPlayer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onChangeBind         = this._onChange.bind(this)
    this._getNextPlayMusicBind = this._getNextPlayMusic.bind(this)
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount () {
    this.props.context.audioPlayerStore.onChange(this._onChangeBind)
    this.props.context.musicListStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount () {
    this.props.context.audioPlayerStore.removeChangeListener(this._onChangeBind)
    this.props.context.musicListStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    const music         = this._currentMusic()
    const playbackState = this.props.context.audioPlayerStore.playbackState

    return (
      <div className="audio-player">
        <div className="audio-player__container">
          <AudioPlayerControl
            audioPlayerAction={this.props.context.audioPlayerAction}
            musicListAction={this.props.context.musicListAction}
            music={music}
            playbackState={playbackState}
            volume={this.props.context.audioPlayerStore.volume}
            getNextPlayMusic={this._getNextPlayMusicBind} />
          <AudioPlayerInfo
            audioPlayerAction={this.props.context.audioPlayerAction}
            audioPlayerStore={this.props.context.audioPlayerStore}
            music={music} />
          <AudioPlayerToolbar
            musicListAction={this.props.context.musicListAction}
            music={music}
            playMusic={this.props.context.audioPlayerStore.currentMusic}
            playbackState={playbackState} />
        </div>
      </div>
    )
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange () {
    this.forceUpdate()
  }

  /**
   * Get the currently music.
   *
   * @return {Music} Success is music. Otherwise null
   */
  _currentMusic () {
    if (this.props.context.audioPlayerStore.playbackState === PlaybackState.Stopped) {
      return this.props.context.musicListStore.currentMusic
    }

    return this.props.context.audioPlayerStore.currentMusic
  }

  /**
   * Get the next play music.
   *
   * @param {Boolean} prev True if get in previous of the music. Default is false
   *
   * @return {Music} Success is music. Otherwise null.
   */
  _getNextPlayMusic (prev) {
    const music = this._currentMusic()
    if (!(music)) {
      return null
    }

    return this.props.context.musicListStore.next(music, prev)
  }
}

AudioPlayer.propTypes = {
  context: PropTypes.object
}
