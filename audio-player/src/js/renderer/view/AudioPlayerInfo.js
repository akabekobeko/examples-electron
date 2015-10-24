import React    from 'react';
import Util     from '../../common/Util.js';
import { PlaybackState }  from '../../common/Constants.js';

/**
 * Max spectrum value.
 * @type {Number}
 */
const MAX_SPECTRUM = 255;

/**
 * The margin of the upper part of the spectrum ( px ).
 * @type {Number}
 */
const SPECTRUM_TOP_MARGIN = 5;

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
     * Canvas for spectrum snalyzer.
     * @type {HTMLCanvasElement}
     */
    this._canvas = null;

    /**
     * Canvas context.
     * @type {CanvasRenderingContext2D}
     */
    this._canvasContext = null;

    /**
     * Identifier obtained from requestAnimationFrame.
     * @type {Number}
     */
    this._animationId = null;

    /**
     * Before playback state.
     * @type {PlaybackState}
     */
    this._playbackStateBefore = PlaybackState.Stopped;

    /**
     * State of component.
     * @type {Object}
     */
    this.state = {
      useSpectrumAnalizer: false
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

    const style = { display: this.state.useSpectrumAnalizer ? 'none' : 'block' };

    return (
      <div className="audio-player__container__info">
        <div className="audio-player__container__info__container">
          <div className="audio-player__container__info__container__image">
            { info.image ? ( <img src={ info.image } /> ) : null }
          </div>
          { this._renderSpectrumAnalizer() }
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
   * Render for audio spectrum analizer.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderSpectrumAnalizer() {
    // Update spectrum analizer
    const playbackStateNow = this.props.audioPlayerStore.playbackState;
    if( this._playbackStateBefore !== playbackStateNow ) {
      if( playbackStateNow === PlaybackState.Stopped ) {
        this._stopSpectrumAnalizer();
      } else {
        this._updateSpectrumAnalizer();
      }

      this._playbackStateBefore = playbackStateNow;
    }

    const style = { display: this.state.useSpectrumAnalizer ? 'block' : 'none' };
    return (
      <div
        className="audio-player__container__info__container__spectrum-analizer"
        style={ style }
        onClick={ this._onClickInfoDisplay.bind( this ) }>
        <canvas ref="canvas">
        </canvas>
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
    this.setState( { useSpectrumAnalizer: !( this.state.useSpectrumAnalizer ) } );
  }

  /**
   * Update the spectrum analizer.
   */
  _updateSpectrumAnalizer() {
    const spectrums = this.props.audioPlayerStore.spectrums;
    if( !( spectrums ) ) { return; }

    this._canvasContext.clearRect( 0, 0, this._canvas.width, this._canvas.height );

    const max        = spectrums.length;
    const backHeight = this._canvas.height - SPECTRUM_TOP_MARGIN;
    const width      = Math.round( ( this._canvas.width / max ) / 2 );
    const nextX      = width * 2;

    this._drawSpectrum( spectrums[ 0 ], 0, width, backHeight );
    for( let i = 1; i < max; ++i ) {
      const x = i * nextX;
      this._drawSpectrum( spectrums[ i ], x, width, backHeight );
    }

    this._animationId = requestAnimationFrame( this._updateSpectrumAnalizer.bind( this ) );
  }

  /**
   * Draw the background and the spectrum graph.
   *
   * @param  {Number} spectrum   Spectrum ( range: 0 - 255 ).
   * @param  {Number} x          The x-coordinate of the upper-left corner of the rectangle ( px ).
   * @param  {Number} width      The width of the rectangle ( px ).
   * @param  {Number} backHeight The height of the background ( px ).
   */
  _drawSpectrum( spectrum, x, width, backHeight ) {
    const percent = spectrum / MAX_SPECTRUM;
    const height  = Math.round( this._canvas.height * percent ) - SPECTRUM_TOP_MARGIN;
    const y       = ( this._canvas.height - height );

    // Background
    this._canvasContext.fillStyle = '#ecf0f1';
    this._canvasContext.fillRect( x, SPECTRUM_TOP_MARGIN, width, backHeight );

    //Bar graph
    this._canvasContext.fillStyle = '#bdc3c7';
    this._canvasContext.fillRect( x, y, width, height );
  }

  /**
   * Stop the spectrum analizer.
   */
  _stopSpectrumAnalizer() {
    this._canvasContext.clearRect( 0, 0, this._canvas.width, this._canvas.height );
    cancelAnimationFrame( this._animationId );
  }
}
