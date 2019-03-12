import React from 'react'
import PlayerConsole from './PlayerConsole'
import PlayerInformation from './PlayerInformation'
import PlayerToolbar from './PlayerToolbar'
import Styles from './Player.scss'
import Music from '../models/Music'
import { PlayerState, PlaybackState } from '../Types'

export type StateByProps = {
  playerState: PlayerState
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
  playerState,
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
        isPlaying={playerState.playbackState === PlaybackState.Playing}
        volume={playerState.volume}
        onPlay={onPlay}
        onPrev={onPrev}
        onNext={() => onNext}
        onChangeVolume={onChangeVolume}
      />
      <PlayerInformation
        playingMusic={playingMusic}
        currentTime={playerState.currentTime}
        onSeek={seek}
      />
      <PlayerToolbar removeMusic={removeMusic} importMusic={importMusic} />
    </div>
  </div>
)

export default Player
