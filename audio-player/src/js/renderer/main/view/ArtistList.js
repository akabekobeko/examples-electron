import React from 'react'

/**
 * Item of the ArtistList.
 */
class ArtistItem extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickBind = this._onClick.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div
        className={'artist-list__item' + this.props.selected}
        onClick={this._onClickBind}>
        <img className="artist-list__item__image" src={this.props.artist.image} />
        <div className="artist-list__item__name" title={this.props.artist.name}>{this.props.artist.name}</div>
        <div className="artist-list__item__albums">{this.props.artist.albums.length} album (s)</div>
      </div>
    )
  }

  /**
   * Occurs when the item is clicked.
   */
  _onClick () {
    this.props.click(this.props.artist)
  }
}

ArtistItem.propTypes = {
  selected: React.PropTypes.string,
  artist: React.PropTypes.object,
  click: React.PropTypes.func
}

/**
 * Component for artist list.
 */
export default class ArtistList extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onChangeBind    = this._onChange.bind(this)
    this._onClickItemBind = this._onClickItem.bind(this)
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount () {
    this.props.context.musicListStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount () {
    this.props.context.musicListStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className="artist-list">
        {this._renderArtists()}
      </div>
    )
  }

  /**
   * Render for artists.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderArtists () {
    const current = this.props.context.musicListStore.currentArtist
    return this.props.context.musicListStore.artists.map((artist, index) => {
      const selected = (current && current.name === artist.name ? ' selected' : '')
      return <ArtistItem
        key={index}
        artist={artist}
        index={index}
        selected={selected}
        click={this._onClickItemBind} />
    })
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange () {
    this.forceUpdate()
  }

  /**
   * Occurs when the artist is clicked.
   *
   * @param {Artist} artist Artist.
   */
  _onClickItem (artist) {
    this.props.context.musicListAction.selectArtist(artist)
  }
}

ArtistList.propTypes = {
  context: React.PropTypes.object
}
