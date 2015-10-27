import React from 'react';
import Util  from '../../common/Util.js';

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
   * @param  {Array.<Music>} musics musics
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderMusics( musics ) {
    return musics.map( ( music ) => {
      return (
        <div
          key={ music.id }
          className="album-list__item__body__item">
          <div className="album-list__item__body__item__track">{ music.track }</div>
          <div className="album-list__item__body__item__title">{ music.title }</div>
          <div className="album-list__item__body__item__duration">{ Util.secondsToString( music.duration ) }</div>
        </div>
      );
    } );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }
}
