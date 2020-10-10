import React from 'react'
import styled from 'styled-components'
import { ArtistListItem } from './ArtistListItem'
import { Artist } from '../models/Artist'

export type StateByProps = {
  artists: Artist[]
  currentArtist: Artist | null
}

export type DispatchByProps = {
  selectArtist?: (artist: Artist) => void
}

type Props = StateByProps & DispatchByProps

const StyledArtistList = styled.div`
  user-select: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  background-color: #fafafa;
`

/**
 * Component of an artist list.
 */
export const ArtistList: React.FC<Props> = ({
  artists,
  currentArtist,
  selectArtist = () => {}
}) => (
  <StyledArtistList>
    {artists.map((artist, index) => (
      <ArtistListItem
        key={index}
        artist={artist}
        selected={!!(currentArtist && currentArtist.name === artist.name)}
        onSelect={selectArtist}
      />
    ))}
  </StyledArtistList>
)
