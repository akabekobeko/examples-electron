import React from 'react'
import { PlaybackState } from '../../../common/Constants.js'

/**
 * Component for audio player toolbar.
 */
export default class AudioPlayerToolbar extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickRemoveButtonBind = this._onClickRemoveButton.bind(this)
    this._onClickImportButtonBind = this._onClickImportButton.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className="audio-player__container__toolbar">
        <div className="audio-player__container__toolbar__container">
          <div
            className="audio-player__container__toolbar__container__button remove"
            onClick={this._onClickRemoveButtonBind}>
            <i className="icon-minus" />
          </div>
          <div
            className="audio-player__container__toolbar__container__button import"
            onClick={this._onClickImportButtonBind}>
            <i className="icon-plus" />
          </div>
        </div>
      </div>
    )
  }

  /**
   * Occurs when the remove music button is clicked.
   */
  _onClickRemoveButton () {
    if (!(this.props.music)) { return }

    if (this.props.playbackState !== PlaybackState.Stopped) {
      if (this.props.playMusic && this.props.playMusic.id === this.props.music.id) { return }
    }

    this.props.musicListAction.remove(this.props.music)
  }

  /**
   * Occurs when the import music button is clicked.
   */
  _onClickImportButton () {
    this.props.musicListAction.import()
  }
}

AudioPlayerToolbar.propTypes = {
  musicListAction: React.PropTypes.object,
  playbackState: React.PropTypes.number,
  playMusic: React.PropTypes.object,
  music: React.PropTypes.object
}
