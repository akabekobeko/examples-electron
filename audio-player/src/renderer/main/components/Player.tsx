import React from 'react'
import styled from 'styled-components'
import { PlayerConsole } from './PlayerConsole'
import { PlayerInformation } from './PlayerInformation'
import { PlayerToolbar } from './PlayerToolbar'
import { Music } from '../models/Music'
import { PlaybackState } from '../Types'

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

const StyledPlayer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.theme.layout.playerHeight};
  border-bottom: solid 1px ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.grayLight};
  -webkit-user-select: none;
  user-select: node;
  box-shadow: 0px 2px 3px -3px rgba(0, 0, 0, 0.6);
  z-index: 1;
`

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

/**
 * Component of a music player control.
 */
export const Player: React.FC<Props> = ({
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
  <StyledPlayer>
    <StyledContainer>
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
    </StyledContainer>
  </StyledPlayer>
)
