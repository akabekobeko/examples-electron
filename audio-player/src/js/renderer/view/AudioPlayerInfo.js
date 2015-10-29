import React            from 'react';
import Util             from '../../common/Util.js';
import SpectrumAnalyzer from './SpectrumAnalyzer.js';

/**
 * Component for audio player information display.
 */
export default class AudioPlayerInfo extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

    /**
     * State of component.
     * @type {Object}
     */
    this.state = {
      useSpectrumAnalyzer: false
    };
  }

  /**
   * occur when the component did mount.
   */
  componentDidMount() {
    this._canvas = this.refs.canvas;
    if( this._canvas ) {
      this._canvasContext = this._canvas.getContext( '2d' );
    }
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    const info = {
      title:           'Title',
      albumArtist:     'Album - Artist',
      currentTime:     Math.round( this.props.audioPlayerStore.currentTime ),
      currentTimeText: Util.secondsToString( this.props.audioPlayerStore.currentTime ),
      duration:        0,
      durationText: '  0:00'
    }

    const music = this.props.music;
    if( this.props.music ) {
      info.title        = music.title;
      info.albumArtist  = music.artist + ' - ' + music.album;
      info.duration     = Math.round( music.duration );
      info.durationText = Util.secondsToString( music.duration );
      info.image        = music.image;
    }

    const style = { display: this.state.useSpectrumAnalyzer ? 'none' : 'block' };

    return (
      <div className="audio-player__container__info">
        <div className="audio-player__container__info__container">
          <img
            className="audio-player__container__info__container__image"
            src={ info.image } />
          <SpectrumAnalyzer
            audioPlayerStore={ this.props.audioPlayerStore }
            useSpectrumAnalyzer={ this.state.useSpectrumAnalyzer }
            onClickInfoDisplay={ this._onClickInfoDisplay.bind( this ) } />
          <div
            className="audio-player__container__info__container__info"
            style={ style }
            onClick={ this._onClickInfoDisplay.bind( this ) }>
            <div className="audio-player__container__info__container__title">{ info.title }</div>
            <div className="audio-player__container__info__container__artist-album">{ info.albumArtist }</div>
            <div className="audio-player__container__info__container__time playbacktime">{ info.currentTimeText }</div>
            <div className="audio-player__container__info__container__time duration">{ info.durationText }</div>
          </div>
          <div className="audio-player__container__info__container__slider">
            <input
              type="range"
              min={ 0 }
              max={ info.duration }
              value={ info.currentTime }
              onChange={ this._onChangePlaybackPosition.bind( this ) }>
            </input>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Occurs when the playback position is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangePlaybackPosition( ev ) {
    this.props.audioPlayerAction.seek( ev.target.value );
  }

  /**
   * Occurs when the information area is clicked.
   */
  _onClickInfoDisplay() {
    this.setState( { useSpectrumAnalyzer: !( this.state.useSpectrumAnalyzer ) } );
  }
}
