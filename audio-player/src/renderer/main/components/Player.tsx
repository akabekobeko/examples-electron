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
  play?: () => void
  pause?: () => void
  prev?: () => void
  next?: () => void

  changeVolume?: (value: number) => void
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
  play = () => {},
  pause = () => {},
  prev = () => {},
  next = () => {},
  changeVolume = () => {},
  seek = () => {},
  removeMusic = () => {},
  importMusic = () => {}
}) => (
  <div className={Styles.container}>
    <div className={Styles.panel}>
      <PlayerConsole
        isPlaying={playbackState === PlaybackState.Playing}
        volume={volume}
        onPlay={play}
        onPause={pause}
        onPrev={prev}
        onNext={next}
        onChangeVolume={changeVolume}
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
