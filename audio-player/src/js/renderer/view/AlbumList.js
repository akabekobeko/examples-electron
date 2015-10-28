import React             from 'react';
import Util              from '../../common/Util.js';
import { PlaybackState } from '../../common/Constants.js';

/**
 * Component for album list.
 */
export default class AlbumList extends React.Component {
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
      <div className="album-list">
        { this._renderAlbums() }
      </div>
    );
  }

  /**
   * Render for albums.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderAlbums() {
    const artist = this.props.context.musicListStore.currentArtist;
    if( !( artist ) ) { return null; }

    return artist.albums.map( ( album, index ) => {
      return (
        <div
          key={ index }
          className="album-list__item">
          <div className="album-list__item__header">
            <img className="album-list__item__header__image" src={ album.image } />
            <div className="album-list__item__header__name">{ album.name }</div>
            <div className="album-list__item__header__year">{ album.year }</div>
          </div>
          <div className="album-list__item__body">
            { this._renderMusics( album.musics ) }
          </div>
        </div>
      )
    } );
  }

  /**
   * Render for album musics.
   *
   * @param {Array.<Music>} musics musics
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderMusics( musics ) {
    const currentMusic = this.props.context.musicListStore.currentMusic;
    const currentPlay  = this._getCurrentPlay();

    // Group by disc number
    const discs = {};
    musics.forEach( ( music ) => {
      if( discs[ music.disc ] === undefined ) {
        discs[ music.disc ] = [];
      }

      discs[ music.disc ].push( music );
    } );

    // Multi disc
    const keys = Object.keys( discs );
    if( 1 < keys.length ) {
      const results = [];
      keys.forEach( ( key ) => {
        results.push( (
          <div key={ key } className="album-list__item__body__disc">
            Disc { key }
          </div>
        ) );

        discs[ key ].forEach( ( music ) => {
          results.push( this._renderMusic( music, currentMusic, currentPlay ) );
        } );
      } );

      return results;
    }

    // Single disc
    return musics.map( ( music ) => {
      return this._renderMusic( music, currentMusic, currentPlay );
    } );
  }

  /**
   * Render for album music.
   *
   * @param {Music} musics       music.
   * @param {Music} currentMusic Currently music.
   * @param {Music} currentPlay  Currently playback music.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderMusic( music, currentMusic, currentPlay ) {
    const selected = ( currentMusic && currentMusic.id === music.id ? ' selected' : '' );
    const icon     = ( currentPlay  && currentPlay.id  === music.id ? ( <i className="icon-play"></i> ) : null );

    return (
      <div
        key={ music.id }
        className={ 'album-list__item__body__item' + selected }
        onClick={ this._onClickMusic.bind( this, music ) }
        onDoubleClick={ this._onDoubleClickMusic.bind( this, music ) }>
        <div className="album-list__item__body__item__icon">{ icon }</div>
        <div className="album-list__item__body__item__track">{ music.track }</div>
        <div className="album-list__item__body__item__title">{ music.title }</div>
        <div className="album-list__item__body__item__duration">{ Util.secondsToString( music.duration ) }</div>
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
   * Occurs when the music is clicked.
   *
   * @param {Object} music Music.
   */
  _onClickMusic( music ) {
    this.props.context.musicListAction.select( music );
  }

  /**
   * Occurs when the music is double-clicked.
   *
   * @param {Object} music Music.
   */
  _onDoubleClickMusic( music ) {
    this.props.context.musicListAction.select( music );
    this.props.context.audioPlayerAction.open( music, true );
  }

  /**
   * Get the currently playback mucic
   *
   * @return {Object} Success is music, otherwise null.
   */
  _getCurrentPlay() {
    const store = this.props.context.audioPlayerStore;
    if( store.playbackState === PlaybackState.Stopped ) { return null; }

    return store.currentMusic;
  }
}
