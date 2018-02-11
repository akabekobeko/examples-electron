import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AlbumListContainer.scss'
import Header from './AlbumListHeader.js'
import MusicList from './MusicList.js'
import { PlaybackState } from '../../../Constants.js'

/**
 * Component of the album list.
 *
 * @param {object} props Properties.
 * @param {AppContext} props.context Context.
 */
const AlbumListContainer = ({ context }) => {
  const playingMusic = context.audioPlayerStore.playbackState === PlaybackState.Stopped ? null : context.audioPlayerStore.currentMusic
  const artist = context.musicListStore.currentArtist
  const albums = !(artist) ? null : artist.albums.map((album, index) => {
    return (
      <div key={index} className={Styles.item}>
        <Header
          album={album}
        />
        <MusicList
          musics={album.musics}
          selectedMusic={context.musicListStore.currentMusic}
          playingMusic={playingMusic}
          onSelect={(music) => context.musicListAction.select(music)}
          onPlay={(music) => {
            context.musicListAction.select(music)
            context.audioPlayerAction.open(music, true)
          }}
        />
      </div>
    )
  })

  return (
    <div className={Styles.list}>
      {albums}
    </div>
  )
}

AlbumListContainer.propTypes = {
  context: PropTypes.object
}

export default AlbumListContainer
