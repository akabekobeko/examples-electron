import React from 'react'
import Music from '../models/Music'
import * as Util from '../Util'
import * as Styles from './MusicListItem.scss'

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
    <div className={Styles.duration}>
      {Util.secondsToString(music.duration)}
    </div>
  </div>
)

export default MusicListItem
