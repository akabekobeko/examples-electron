import React from 'react'
import Music from '../models/Music'
import * as Styles from './MusicListItem.scss'

/**
 * Convert the seconds to a string.
 * @param seconds Seconds.
 * @returns Converted string.
 */
export const secondsToString = (seconds: number): string => {
  const total = Math.round(seconds)
  const h = (total / 3600) | 0
  const m = ((total % 3600) / 60) | 0
  const s = total % 60

  function padding(value: number) {
    return ('0' + value).slice(-2)
  }

  return 0 < h
    ? h + ':' + padding(m) + ':' + padding(s)
    : 0 < m
    ? m + ':' + padding(s)
    : '0:' + padding(s)
}

type Props = {
  /** Target music. */
  music: Music
  /** `true` if selected. */
  selected: boolean
  /** `true` if playing. */
  playing: boolean
  /** Called when the music is selected. */
  onSelect: (music: Music) => void
  /** Called when the music is played or paused. */
  onPlay: (music: Music) => void
}

const MusicListItem: React.FC<Props> = ({
  music,
  selected,
  playing,
  onSelect,
  onPlay
}) => (
  <div
    className={selected ? `${Styles.music} ${Styles.selected}` : Styles.music}
    onClick={() => onSelect(music)}
    onDoubleClick={() => onPlay(music)}
  >
    <div className={Styles.icon}>
      {playing ? <i className={`icon-play`} /> : null}
    </div>
    <div className={Styles.track}>{music.track}</div>
    <div className={Styles.title} title={music.title}>
      {music.title}
    </div>
    <div className={Styles.duration}>{secondsToString(music.duration)}</div>
  </div>
)

export default MusicListItem
