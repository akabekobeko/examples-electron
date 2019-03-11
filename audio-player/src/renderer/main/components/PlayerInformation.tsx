import React from 'react'
import Music from '../models/Music'
import { secondsToString } from './MusicListItem'
import Styles from './PlayerInformation.scss'

type Props = {
  playingMusic: Music | null
  currentTime: number
  onSeek: (position: number) => void
}

const PlayerInformation: React.FC<Props> = ({
  playingMusic,
  currentTime,
  onSeek
}) => {
  const info = {
    title: 'Title',
    albumArtist: 'Album - Artist',
    currentTime: Math.round(currentTime),
    currentTimeText: secondsToString(currentTime),
    duration: 0,
    durationText: '  0:00',
    imageFilePath: ''
  }

  if (playingMusic) {
    info.title = playingMusic.title
    info.albumArtist = playingMusic.artist + ' - ' + playingMusic.album
    info.duration = Math.round(playingMusic.duration)
    info.durationText = secondsToString(playingMusic.duration)
    info.imageFilePath = playingMusic.imageFilePath
  }

  return (
    <div className={Styles.information}>
      <div className={Styles.container}>
        <img className={Styles.image} src={info.imageFilePath} />
        <div>
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
