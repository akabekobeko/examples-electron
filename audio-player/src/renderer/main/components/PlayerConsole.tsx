import React from 'react'
import styled from 'styled-components'
import { Theme } from '../../Theme'
import { Icon } from './Icon'

type Props = {
  /** `true` if the music is playing. */
  isPlaying: boolean
  /** Volume. */
  volume: number
  /** Called when the music is played or stopped. */
  onPlay: () => void
  /** Called when the music is paused. */
  onPause: () => void
  /** Called when moving to the previous music. */
  onPrev: () => void
  /** Called when moving to the next music. */
  onNext: () => void
  /** Called when the volume is changed. */
  onChangeVolume: (value: number) => void
}

const StyledPlayerConsole = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 256px;
  height: 100%;
`

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const StyledPrevButton = styled.div`
  position: absolute;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  top: 10px;
  left: 4px;
`

const StyledPlayButton = styled.div`
  position: absolute;
  display: inline-block;
  cursor: pointer;
  font-size: 36px;
  left: 36px;
`

const StyledNextButton = styled.div`
  position: absolute;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  top: 10px;
  left: 80px;
`

const StyledSlider = styled.input`
  -webkit-appearance: none;
  position: absolute;
  left: 130px;
  top: 8px;
  width: 100px;
  height: 24px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    margin-top: -5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: solid 1px ${(props) => props.theme.colors.gray};
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  }

  &::-webkit-slider-runnable-track {
    margin-top: 6px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.gray};
  }
`

/**
 * Component of a console on music player.
 */
export const PlayerConsole: React.FC<Props> = ({
  isPlaying,
  volume,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onChangeVolume
}) => (
  <StyledPlayerConsole>
    <StyledContainer>
      <StyledPrevButton onClick={onPrev}>
        <Icon icon={Theme.icons.controllerJumpToStart} />
      </StyledPrevButton>
      <StyledPlayButton onClick={() => (isPlaying ? onPause() : onPlay())}>
        {isPlaying ? (
          <Icon icon={Theme.icons.controllerPause} />
        ) : (
          <Icon icon={Theme.icons.controllerPlay} />
        )}
      </StyledPlayButton>
      <StyledNextButton onClick={onNext}>
        <Icon icon={Theme.icons.controllerNext} />
      </StyledNextButton>
      <StyledSlider
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(ev) => onChangeVolume(Number(ev.target.value))}
      />
    </StyledContainer>
  </StyledPlayerConsole>
)
