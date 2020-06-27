import React from 'react'
import { Artist } from '../models/Artist'
import Styles from './ArtistListItem.scss'

type Props = {
  /** Artist. */
  artist: Artist
  /** Indicates that an item is selected. */
  selected: boolean
  /** Called when an item is clicked. */
  onSelect: (artist: Artist) => void
}

/**
 * Component of an item on artist list.
 */
export const ArtistListItem: React.FC<Props> = ({
  artist,
  selected,
  onSelect
}) => (
  <div
    className={selected ? `${Styles.item} ${Styles.selected}` : Styles.item}
    onClick={() => onSelect(artist)}
  >
    <img className={Styles.image} src={artist.imageFilePath} />
    <div className={Styles.name} title={artist.name}>
      {artist.name}
    </div>
    <div className={Styles.albums}>{artist.albums.length} album (s)</div>
  </div>
)
