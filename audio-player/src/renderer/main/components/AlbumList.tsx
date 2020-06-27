import React from 'react'
import { Music } from '../models/Music'
import Styles from './AlbumList.scss'
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

export const AlbumList: React.FC<Props> = ({
  albums,
  currentMusic,
  playingMusic,
  selectMusic = () => {},
  openWithPlay = () => {}
}) => (
  <div className={Styles.list}>
    {albums.map((album, index) => (
      <div key={index} className={Styles.item}>
        <div className={Styles.header}>
          <img className={Styles.image} src={album.imageFilePath} />
          <div className={Styles.name} title={album.name}>
            {album.name}
          </div>
          <div className={Styles.year}>{album.year}</div>
        </div>
        <MusicList
          musics={album.musics}
          selectedMusic={currentMusic}
          playingMusic={playingMusic}
          onSelect={selectMusic}
          onPlay={openWithPlay}
        />
      </div>
    ))}
  </div>
)
