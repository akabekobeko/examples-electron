import React from 'react'
import styled from 'styled-components'
import { Music } from '../models/Music'
import { MusicList } from './MusicList'
import { Album } from '../models/Album'

export type StateByProps = {
  albums: Album[]
  currentMusic: Music | null
  playingMusic: Music | null
}

export type DispatchByProps = {
  selectMusic?: (music: Music) => void
  openWithPlay?: (music: Music) => void
}

type Props = StateByProps & DispatchByProps

const StyledAlbumList = styled.div`
  user-select: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
`

const StyledAlbumItem = styled.div`
  width: 100%;
  margin-bottom: 1em;
`

const StyledHeader = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray};
  cursor: pointer;
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
  bottom: 4px;
  left: 56px;
  right: 48px;
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledYear = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.grayDarkness};
`

/**
 * Component of an alubum list.
 */
export const AlbumList: React.FC<Props> = ({
  albums,
  currentMusic,
  playingMusic,
  selectMusic = () => {},
  openWithPlay = () => {}
}) => (
  <StyledAlbumList>
    {albums.map((album, index) => (
      <StyledAlbumItem key={index}>
        <StyledHeader>
          <StyledImage src={album.imageFilePath} />
          <StyledName title={album.name}>{album.name}</StyledName>
          <StyledYear>{album.year}</StyledYear>
        </StyledHeader>
        <MusicList
          musics={album.musics}
          selectedMusic={currentMusic}
          playingMusic={playingMusic}
          onSelect={selectMusic}
          onPlay={openWithPlay}
        />
      </StyledAlbumItem>
    ))}
  </StyledAlbumList>
)
