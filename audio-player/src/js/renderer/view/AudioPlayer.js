import React             from 'react';
import { PlaybackState } from '../../common/Constants.js';
import Util              from '../../common/Util.js';

/**
 * Component for audio player controls.
 */
export default class MainWindow extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

    /**
     * Function to watch the change of Store.
     * @type {Function}
     */
    this._onChangeBind = this._onChange.bind( this );
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount() {
    this.props.context.audioPlayerStore.onChange( this._onChangeBind );
    this.props.context.musicListStore.onChange( this._onChangeBind );
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount() {
    this.props.context.audioPlayerStore.removeChangeListener( this._onChangeBind );
    this.props.context.musicListStore.removeChangeListener( this._onChangeBind );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="audio-player">
        <div className="audio-player__container">
          { this._renderPlayer() }
          { this._renderInfo() }
          { this._renderToolbar() }
        </div>
      </div>
    );
  }

  /**
   * Render for audio controls.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderPlayer() {
    const playIcon = ( this.props.context.audioPlayerStore.playbackState === PlaybackState.Playing ? 'icon-pause' : 'icon-play' );
    return (
      <div className="audio-player__container__player">
        <div className="audio-player__container__player__container">
          <div
            className="audio-player__container__player__container__button prev"
            onClick={ this._onClickPrevButton.bind( this ) }>
            <i className="icon-prev"></i>
          </div>
          <div
            className="audio-player__container__player__container__button play"
            onClick={ this._onClickPlayButton.bind( this ) }>
            <i className={ playIcon }></i>
          </div>
          <div
            className="audio-player__container__player__container__button next"
            onClick={ this._onClickNextButton.bind( this ) }>
            <i className="icon-next"></i>
          </div>
          <input
            type="range"
            className="audio-player__container__player__container__slider"
            mix={ 0 }
            max={ 100 }
            value={ this.props.context.audioPlayerStore.volume }
            onChange={ this._onChangeVolume.bind( this ) }>
          </input>
        </div>
      </div>
    );
  }

  /**
   * Render for music information.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderInfo() {
    const info = {
      title:            'Title',
      albumArtist:      'Album - Artist',
      currentTime:     Math.round( this.props.context.audioPlayerStore.currentTime ),
      currentTimeText: Util.secondsToString( this.props.context.audioPlayerStore.currentTime ),
      duration:         0,
      durationText: '   0:00'
    }

    const music = this._currentMusic();
    if( music ) {
      info.title        = music.title;
      info.albumArtist  = music.artist + ' - ' + music.album;
      info.duration     = Math.round( music.duration );
      info.durationText = Util.secondsToString( music.duration );
    }

    return (
      <div className="audio-player__container__info">
        <div className="audio-player__container__info__container">
          <div className="audio-player__container__info__container__title">{ info.title }</div>
          <div className="audio-player__container__info__container__artist-album">{ info.albumArtist }</div>
          <div className="audio-player__container__info__container__time playbacktime">{ info.currentTimeText }</div>
          <div className="audio-player__container__info__container__time duration">{ info.durationText }</div>
          <input
            type="range"
            className="audio-player__container__info__container__slider"
            min={ 0 }
            max={ info.duration }
            value={ info.currentTime }
            onChange={ this._onChangePlaybackPosition.bind( this ) }>
          </input>
        </div>
      </div>
    );
  }

  /**
   * Render for toolbar.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderToolbar() {
    return (
      <div className="audio-player__container__toolbar">
        <div className="audio-player__container__toolbar__container">
          <div
            className="audio-player__container__toolbar__container__button remove"
            onClick={ this._onClickRemoveButton.bind( this ) }>
            <i className="icon-minus"></i>
          </div>
          <div
            className="audio-player__container__toolbar__container__button import"
            onClick={ this._onClickImportButton.bind( this ) }>
            <i className="icon-plus"></i>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }

  /**
   * Occurs when the play music button is clicked.
   */
  _onClickPlayButton() {
    const state = this.props.context.audioPlayerStore.playbackState;
    switch( state ) {
      case PlaybackState.Stopped:
        this.props.context.audioPlayerAction.open( this._currentMusic(), true );
        break;

      case PlaybackState.Paused:
        this.props.context.audioPlayerAction.play();
        break;

      case PlaybackState.Playing:
        this.props.context.audioPlayerAction.pause();
        break;

      default:
        return;
    }
  }

  /**
   * Occurs when the previource music button is clicked.
   */
  _onClickPrevButton() {
    this._selectNextMusic( true );
  }

  /**
   * Occurs when the next music button is clicked.
   */
  _onClickNextButton() {
    this._selectNextMusic();
  }

  /**
   * Select the next music.
   *
   * @param {Boolean} prev If true to play a audio. Default is false.
   */
  _selectNextMusic( prev ) {
    let music = this._currentMusic();
    if( !( music ) ) { return; }

    music = this.props.context.musicListStore.next( music, prev );
    if( !( music ) ) { return; }

    this.props.context.musicListAction.select( music );
    if( this.props.context.audioPlayerStore.playbackState !== PlaybackState.Stopped ) {
      this.props.context.audioPlayerAction.open( music, true );
    }
  }

  /**
   * Occurs when the volume is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangeVolume( ev ) {
    this.props.context.audioPlayerAction.volume( ev.target.value );
  }

  /**
   * Occurs when the playback position is changed.
   *
   * @param {Event} ev Event data.
   */
  _onChangePlaybackPosition( ev ) {
    this.props.context.audioPlayerAction.seek( ev.target.value );
  }

  /**
   * Occurs when the remove music button is clicked.
   */
  _onClickRemoveButton() {
    const music = this.props.context.musicListStore.currentMusic;
    if( !( music ) ) { return; }

    if( this.props.context.audioPlayerStore.playbackState !== PlaybackState.Stopped ) {
      const playMusic = this.props.context.audioPlayerStore.currentMusic;
      if( playMusic && playMusic.id === music.id ) { return; }
    }

    this.props.context.musicListAction.remove( music.id );
  }

  /**
   * Occurs when the import music button is clicked.
   */
  _onClickImportButton() {
    this.props.context.musicListAction.import();
  }

  /**
   * Get the currently music.
   *
   * @return {Object} Success is music. Otherwise null;
   */
  _currentMusic() {
    if( this.props.context.audioPlayerStore.playbackState === PlaybackState.Stopped ) {
      return this.props.context.musicListStore.currentMusic;
    }

    return this.props.context.audioPlayerStore.currentMusic;
  }
}
