import React from 'react'
import Music from '../models/Music'
import MusicListItem from './MusicListItem.js'
import Styles from './MusicList.scss'

/**
 * Group music by disc number.
 * @param musics Collection of music.
 * @returns Grouped musics.
 */
const groupByDisc = (musics: Music[]): Array<Music[]> => {
  const groups = new Array<Music[]>()
  musics.forEach((music) => {
    if (groups[music.disc]) {
      groups[music.disc].push(music)
    } else {
      groups[music.disc] = []
    }
  })

  return groups
}

type Props = {
  /** Collection of music. */
  musics: Music[]
  /** Selected music. */
  selectedMusic: Music | null
  /** Playing music. */
  playingMusic: Music | null
  /** Called when the music is selected. */
  onSelect: (music: Music) => void
  /** Called when the music is played or paused. */
  onPlay: (music: Music) => void
}

const Musics: React.FC<Props> = ({
  musics,
  selectedMusic,
  playingMusic,
  onSelect,
  onPlay
}) => (
  <>
    {musics.map((music) => (
      <MusicListItem
        music={music}
        selected={music === selectedMusic}
        playing={music === playingMusic}
        onSelect={onSelect}
        onPlay={onPlay}
      />
    ))}
  </>
)

const MusicList: React.FC<Props> = ({
  musics,
  selectedMusic,
  playingMusic,
  onSelect,
  onPlay
}) => {
  const discs = groupByDisc(musics)
  return (
    <div className={Styles.list}>
      {discs.length === 1 ? (
        <Musics
          musics={musics}
          selectedMusic={selectedMusic}
          playingMusic={playingMusic}
          onSelect={onSelect}
          onPlay={onPlay}
        />
      ) : (
        discs.map((musicsByDisc, index) => (
          <>
            <div key={index} className={Styles.disc}>
              Disc {index + 1}
            </div>
            <Musics
              musics={musicsByDisc}
              selectedMusic={selectedMusic}
              playingMusic={playingMusic}
              onSelect={onSelect}
              onPlay={onPlay}
            />
          </>
        ))
      )}
    </div>
  )
}

export default MusicList
