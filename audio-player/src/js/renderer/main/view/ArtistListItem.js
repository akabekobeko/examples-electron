import React from 'react'
import PropTypes from 'prop-types'
import Styles from './ArtistListItem.scss'

/**
 * Component of an artist list item.
 *
 * @param {object} props Properties.
 * @param {Album} props.artist Artist.
 * @param {boolean} props.selected Indicates that an item is selected.
 * @param {function} props.onClick Called when an item is clicked.
 */
const ArtistListItem = ({ artist, selected, onClick }) => {
  return (
    <div
      className={selected ? `${Styles.item} ${Styles.selected}` : Styles.item}
      onClick={() => onClick(artist)}>
      <img className={Styles.image} src={artist.image} />
      <div className={Styles.name} title={artist.name}>{artist.name}</div>
      <div className={Styles.albums}>{artist.albums.length} album (s)</div>
    </div>
  )
}

ArtistListItem.propTypes = {
  artist: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default ArtistListItem
