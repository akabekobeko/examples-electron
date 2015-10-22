import React from 'react';
import Util  from '../../common/Util.js';

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
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    const info = {
      title:            'Title',
      albumArtist:      'Album - Artist',
      currentTime:     Math.round( this.props.currentTime ),
      currentTimeText: Util.secondsToString( this.props.currentTime ),
      duration:         0,
      durationText: '   0:00'
    }

    const music = this.props.music;
    if( this.props.music ) {
      info.title        = music.title;
      info.albumArtist  = music.artist + ' - ' + music.album;
      info.duration     = Math.round( music.duration );
      info.durationText = Util.secondsToString( music.duration );
      info.image        = music.image;
    }

    return (
      <div className="audio-player__container__info">
        <div className="audio-player__container__info__container">
          <div className="audio-player__container__info__container__image">
            { info.image ? ( <img src={ info.image } /> ) : null }
          </div>
          <div className="audio-player__container__info__container__title">{ info.title }</div>
          <div className="audio-player__container__info__container__artist-album">{ info.albumArtist }</div>
          <div className="audio-player__container__info__container__time playbacktime">{ info.currentTimeText }</div>
          <div className="audio-player__container__info__container__time duration">{ info.durationText }</div>
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
}
