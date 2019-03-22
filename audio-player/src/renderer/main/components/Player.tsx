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
  currentMusic: Music | null
  currentTime: number
  volume: number
  spectrums: Uint8Array | null
}

export type DispatchByProps = {
  openWithPlay?: (music: Music) => void
  play?: () => void
  pause?: () => void
  prev?: () => void
  next?: () => void

  changeVolume?: (value: number) => void
  seek?: (position: number) => void
  removeMusic?: () => void
  importMusic?: () => void
  showEffector?: () => void
}

type Props = StateByProps & DispatchByProps

const Player: React.FC<Props> = ({
  playbackState,
  currentMusic,
  currentTime,
  volume,
  spectrums,
  openWithPlay = () => {},
  play = () => {},
  pause = () => {},
  prev = () => {},
  next = () => {},
  changeVolume = () => {},
  seek = () => {},
  removeMusic = () => {},
  importMusic = () => {},
  showEffector = () => {}
}) => (
  <div className={Styles.container}>
    <div className={Styles.panel}>
      <PlayerConsole
        isPlaying={playbackState === PlaybackState.Playing}
        volume={volume}
        onPlay={() => {
          if (playbackState === PlaybackState.Stopped) {
            if (currentMusic) {
              openWithPlay(currentMusic)
            }
          } else {
            play()
          }
        }}
        onPause={pause}
        onPrev={prev}
        onNext={next}
        onChangeVolume={changeVolume}
      />
      <PlayerInformation
        playingMusic={currentMusic}
        currentTime={currentTime}
        spectrums={spectrums}
        onSeek={seek}
      />
      <PlayerToolbar
        removeMusic={removeMusic}
        importMusic={importMusic}
        showEffector={showEffector}
      />
    </div>
  </div>
)

export default Player
