import React from 'react'
import Music from '../models/Music'
import MusicListItem from './MusicListItem'
import Styles from './MusicList.scss'

/**
 * Group music by disc number.
 * @param musics Collection of music.
 * @returns Grouped musics.
 */
const groupByDisc = (musics: Music[]): Array<Music[]> => {
  const groups: { [key: string]: Music[] } = {}
  musics.forEach((music) => {
    const key = String(music.disc)
    if (groups[key]) {
      groups[key].push(music)
    } else {
      groups[key] = [music]
    }
  })

  const result = Array<Music[]>()
  for (let key of Object.keys(groups)) {
    const group = groups[key]
    if (group && 0 < group.length) {
      result.push(group)
    }
  }

  return result
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
    {musics.map((music, index) => (
      <MusicListItem
        key={index}
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
          <React.Fragment key={index}>
            <div className={Styles.disc}>Disc {index + 1}</div>
            <Musics
              musics={musicsByDisc}
              selectedMusic={selectedMusic}
              playingMusic={playingMusic}
              onSelect={onSelect}
              onPlay={onPlay}
            />
          </React.Fragment>
        ))
      )}
    </div>
  )
}

export default MusicList
