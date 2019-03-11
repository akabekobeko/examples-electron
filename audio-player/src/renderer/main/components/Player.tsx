import React from 'react'
import PlayerConsole from './PlayerConsole'
import PlayerInformation from './PlayerInformation'
import PlayerToolbar from './PlayerToolbar'
import Styles from './Player.scss'
import Music from '../models/Music'

export type StateByProps = {
  isPlaying: boolean
  volume: number
  playingMusic: Music | null
  currentTime: number
}

export type DispatchByProps = {
  onPlay?: () => void
  onPrev?: () => void
  onNext?: () => void
  onChangeVolume?: (value: number) => void
  seek?: (position: number) => void
  removeMusic?: () => void
  importMusic?: () => void
}

type Props = StateByProps & DispatchByProps

const Player: React.FC<Props> = ({
  isPlaying,
  volume,
  playingMusic,
  currentTime,
  onPlay = () => {},
  onPrev = () => {},
  onNext = () => {},
  onChangeVolume = () => {},
  seek = () => {},
  removeMusic = () => {},
  importMusic = () => {}
}) => (
  <div className={Styles.container}>
    <div className={Styles.panel}>
      <PlayerConsole
        isPlaying={isPlaying}
        volume={volume}
        onPlay={onPlay}
        onPrev={onPrev}
        onNext={() => onNext}
        onChangeVolume={onChangeVolume}
      />
      <PlayerInformation
        playingMusic={playingMusic}
        currentTime={currentTime}
        onSeek={seek}
      />
      <PlayerToolbar removeMusic={removeMusic} importMusic={importMusic} />
    </div>
  </div>
)

export default Player
