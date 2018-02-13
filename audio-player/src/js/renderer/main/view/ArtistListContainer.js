import React from 'react'
import PropTypes from 'prop-types'
import Styles from './ArtistListContainer.scss'
import Item from './ArtistListItem.js'

/**
 * Component of the artist list.
 *
 * @param {Object} props Properties.
 * @param {AppContext} props.context Context.
 */
const ArtistListContainer = ({ context }) => {
  const current = context.musicListStore.currentArtist
  return (
    <div className={Styles.container}>
      {context.musicListStore.artists.map((artist, index) => {
        const selected = (current && current.name === artist.name)
        return (
          <Item
            key={index}
            artist={artist}
            selected={selected}
            onClick={(artist) => context.musicListAction.selectArtist(artist)}
          />
        )
      })}
    </div>
  )
}

ArtistListContainer.propTypes = {
  context: PropTypes.object
}

export default ArtistListContainer
