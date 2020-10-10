import React from 'react'
import styled from 'styled-components'
import { Artist } from '../models/Artist'

type Props = {
  /** Artist. */
  artist: Artist
  /** Indicates that an item is selected. */
  selected: boolean
  /** Called when an item is clicked. */
  onSelect: (artist: Artist) => void
}

const StyledArtistListItem = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
`

const StyledArtistListItemSelected = styled(StyledArtistListItem)`
  background-color: ${(props) => props.theme.colors.blueLight};
`

const StyledImage = styled.img`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 44px;
  height: 44px;
  object-fit: contain;
`

const StyledName = styled.div`
  position: absolute;
  top: 4px;
  left: 56px;
  right: 4px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledAlbum = styled.div`
  position: absolute;
  bottom: 4px;
  left: 56px;
  right: 4px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

/**
 * Component of an item on artist list.
 */
export const ArtistListItem: React.FC<Props> = ({
  artist,
  selected,
  onSelect
}) => {
  const ListItem = selected
    ? StyledArtistListItemSelected
    : StyledArtistListItem
  return (
    <ListItem onClick={() => onSelect(artist)}>
      <StyledImage src={artist.imageFilePath} />
      <StyledName title={artist.name}>{artist.name}</StyledName>
      <StyledAlbum>{artist.albums.length} album (s)</StyledAlbum>
    </ListItem>
  )
}
