import React, { useState } from 'react'
import Music from '../models/Music'
import { secondsToString } from './MusicListItem'
import Styles from './PlayerInformation.scss'
import PlayerSpectrumAnalyzer from './PlayerSpectrumAnalyzer'

/**
 * Create a information for display.
 * @param music Currently playback music.
 * @param currentTime Currently playback time.
 * @returns Created information.
 */
const createInformation = (music: Music | null, currentTime: number) => {
  return music
    ? {
        title: music.title,
        albumArtist: music.artist + ' - ' + music.album,
        currentTime: Math.round(currentTime),
        currentTimeText: secondsToString(currentTime),
        duration: Math.round(music.duration),
        durationText: secondsToString(music.duration),
        imageFilePath: music.imageFilePath
      }
    : {
        title: 'Title',
        albumArtist: 'Album - Artist',
        currentTime: 0,
        currentTimeText: '0:00',
        duration: 0,
        durationText: '  0:00',
        imageFilePath: ''
      }
}

type Props = {
  playingMusic: Music | null
  currentTime: number
  spectrums: Uint8Array | null
  onSeek: (position: number) => void
}

const PlayerInformation: React.FC<Props> = ({
  playingMusic,
  currentTime,
  spectrums,
  onSeek
}) => {
  const info = createInformation(playingMusic, currentTime)
  const [enabledAnalizer, setEnabledAnalizer] = useState(false)

  return (
    <div className={Styles.information}>
      <div className={Styles.container}>
        <img className={Styles.image} src={info.imageFilePath} alt="" />
        <PlayerSpectrumAnalyzer
          enabled={enabledAnalizer}
          spectrums={spectrums}
          onClick={() => setEnabledAnalizer(!enabledAnalizer)}
        />
        <div
          style={{ display: enabledAnalizer ? 'none' : 'block' }}
          onClick={() => setEnabledAnalizer(!enabledAnalizer)}
        >
          <div className={Styles.title}>{info.title}</div>
          <div className={Styles.album}>{info.albumArtist}</div>
          <div className={Styles.playbacktime}>{info.currentTimeText}</div>
          <div className={Styles.duration}>{info.durationText}</div>
        </div>
        <div className={Styles.slider}>
          <input
            type="range"
            min={0}
            max={info.duration}
            value={info.currentTime}
            onChange={(ev) => onSeek(Number(ev.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerInformation
