import React from 'react';

/**
 * Component for artist list.
 */
export default class ArtistList extends React.Component {
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
    this.props.context.musicListStore.onChange( this._onChangeBind );
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount() {
    this.props.context.musicListStore.removeChangeListener( this._onChangeBind );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="artist-list">
        { this._renderArtists() }
      </div>
    );
  }

  /**
   * Render for artists.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderArtists() {
    const current = this.props.context.musicListStore.currentArtist;
    return this.props.context.musicListStore.artists.map( ( artist, index ) => {
      const selected = ( current && current.name === artist.name ? ' selected' : '' );
      return (
        <div
          key={ index }
          className={ 'artist-list__item' + selected }
          onClick={ this._onClickItem.bind( this, artist ) }>
          <img className="artist-list__item__image" src={ artist.image } />
          <div className="artist-list__item__name">{ artist.name }</div>
          <div className="artist-list__item__albums">{ artist.albums.length } album (s)</div>
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

  /**
   * Occurs when the artist is clicked.
   *
   * @param {Artist} artist Artist.
   */
  _onClickItem( artist ) {
    this.props.context.musicListAction.selectArtist( artist );
  }
}
