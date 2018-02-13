import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AlbumListHeader.scss'

/**
 * Component of an album list header.
 *
 * @param {Object} props Properties.
 * @param {Album} props.album Album.
 */
const AlbumListHeader = ({ album }) => {
  return (
    <div className={Styles.header}>
      <img className={Styles.image} src={album.image} />
      <div className={Styles.name} title={album.name}>{album.name}</div>
      <div className={Styles.year}>{album.year}</div>
    </div>
  )
}

AlbumListHeader.propTypes = {
  album: PropTypes.object
}

export default AlbumListHeader
