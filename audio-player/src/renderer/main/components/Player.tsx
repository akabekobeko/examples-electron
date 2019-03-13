import React from 'react'
import PlayerConsole from './PlayerConsole'
import PlayerInformation from './PlayerInformation'
import PlayerToolbar from './PlayerToolbar'
import PlayerSpectrumAnalyzer from './PlayerSpectrumAnalyzer'
import Music from '../models/Music'
import { PlaybackState } from '../Types'
import Styles from './Player.scss'

export type StateByProps = {
  playbackState: PlaybackState
  currentTime: number
  volume: number
  spectrums: Uint8Array | null
  playingMusic: Music | null
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
  playbackState,
  currentTime,
  volume,
  spectrums,
  playingMusic,
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
        isPlaying={playbackState === PlaybackState.Playing}
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
      <PlayerSpectrumAnalyzer spectrums={spectrums} onClick={() => {}} />
      <PlayerToolbar removeMusic={removeMusic} importMusic={importMusic} />
    </div>
  </div>
)

export default Player
