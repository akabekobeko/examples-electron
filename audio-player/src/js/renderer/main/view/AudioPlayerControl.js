import React             from 'react';
import { PlaybackState } from '../../../common/Constants.js';

/**
 * Component for audio player controls.
 */
export default class AudioPlayerControl extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    const playIcon = ( this.props.playbackState === PlaybackState.Playing ? 'icon-pause' : 'icon-play' );
    return (
      <div className="audio-player__container__control">
        <div className="audio-player__container__control__container">
          <div
            className="audio-player__container__control__container__button prev"
            onClick={ this._onClickPrevButton.bind( this ) }>
            <i className="icon-prev"></i>
          </div>
          <div
            className="audio-player__container__control__container__button play"
            onClick={ this._onClickPlayButton.bind( this ) }>
            <i className={ playIcon }></i>
          </div>
          <div
            className="audio-player__container__control__container__button next"
            onClick={ this._onClickNextButton.bind( this ) }>
            <i className="icon-next"></i>
          </div>
          <input
            type="range"
            className="audio-player__container__control__container__slider"
            mix={ 0 }
            max={ 100 }
            value={ this.props.volume }
            onChange={ this._onChangeVolume.bind( this ) }>
          </input>
        </div>
      </div>
    );
  }

  /**
   * Occurs when the play music button is clicked.
   */
  _onClickPlayButton() {
    switch( this.props.playbackState ) {
      case PlaybackState.Stopped:
        this.props.audioPlayerAction.open( this.props.music, true );
        break;

      case PlaybackState.Paused:
        this.props.audioPlayerAction.play();
        break;

      case PlaybackState.Playing:
        this.props.audioPlayerAction.pause();
        break;

      default:
        return;
    }
  }

  /**
   * Occurs when the previource music button is clicked.
   */
  _onClickPrevButton() {
    this._playNextMusic( true );
  }

  /**
   * Occurs when the next music button is clicked.
   */
  _onClickNextButton() {
    this._playNextMusic();
  }

  /**
   * Occurs when the volume is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangeVolume( ev ) {
    this.props.audioPlayerAction.volume( ev.target.value );
  }

  /**
   * Play the next music.
   *
   * @param {Boolean} prev If true to play a music. Default is false.
   */
  _playNextMusic( prev ) {
    const music = this.props.getNextPlayMusic( prev );
    if( !( music ) ) { return; }

    this.props.musicListAction.select( music );
    if( this.props.playbackState !== PlaybackState.Stopped ) {
      this.props.audioPlayerAction.open( music, true );
    }
  }
}
