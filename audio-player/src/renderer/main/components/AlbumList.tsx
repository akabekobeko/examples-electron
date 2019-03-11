import React from 'react'
import Music from '../models/Music'
import Styles from './AlbumList.scss'
import MusicList from './MusicList.js'
import Artist from '../models/Artist'

export type StateByProps = {
  currentArtist: Artist
  currentMusic: Music
  playingMusic: Music | null
}

export type DispatchByProps = {
  selectMusic?: (music: Music) => void
  openWithPlay?: (music: Music) => void
}

type Props = StateByProps & DispatchByProps
const AlbumList: React.FC<Props> = ({
  currentArtist,
  currentMusic,
  playingMusic,
  selectMusic = () => {},
  openWithPlay = () => {}
}) => (
  <div className={Styles.list}>
    {currentArtist
      ? currentArtist.albums.map((album, index) => {
          return (
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
          )
        })
      : null}
  </div>
)

export default AlbumList
