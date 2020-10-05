import React, { useState } from 'react'
import styled from 'styled-components'
import { Music } from '../models/Music'
import { secondsToString } from '../Util'
import { PlayerSpectrumAnalyzer } from './PlayerSpectrumAnalyzer'

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

const StyledPlayerInformation = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 256px;
  right: 256px;
  height: 100%;
`

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-left: solid 1px ${(props) => props.theme.colors.gray};
  border-right: solid 1px ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.grayLightness};
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.theme.layout.playerHeight};
  height: ${(props) => props.theme.layout.playerHeight};
  object-fit: contain;
  background-color: transparent;
`

const StyledTitle = styled.div`
  position: absolute;
  text-align: center;
  top: 1px;
  left: ${(props) => props.theme.layout.playerHeight};
  right: 0;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledAlbum = styled.div`
  position: absolute;
  text-align: center;
  top: 18px;
  left: calc(${(props) => props.theme.layout.playerHeight} + 34px);
  right: 34px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.grayDark};
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledPlaybackTime = styled.div`
  position: absolute;
  top: 19px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.grayDark};
  left: calc(${(props) => props.theme.layout.playerHeight} + 4px);
`

const StyledDuration = styled.div`
  position: absolute;
  top: 19px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.grayDark};
  right: 4px;
`

const StyledSlider = styled.div`
  position: absolute;
  left: ${(props) => props.theme.layout.playerHeight};
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  height: 16px;

  input[type='range'] {
    -webkit-appearance: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 16px;
    background-color: transparent;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -8px;
    width: 4px;
    height: 11px;
    background-color: ${(props) => props.theme.colors.grayDark};
  }

  input[type='range']::-webkit-slider-runnable-track {
    margin-top: 13px;
    height: 2px;
    background-color: ${(props) => props.theme.colors.gray};
  }
`

/**
 * Component of the playing music information.
 */
export const PlayerInformation: React.FC<Props> = ({
  playingMusic,
  currentTime,
  spectrums,
  onSeek
}) => {
  const info = createInformation(playingMusic, currentTime)
  const [enabledAnalizer, setEnabledAnalizer] = useState(false)

  return (
    <StyledPlayerInformation>
      <StyledContainer>
        <StyledImage src={info.imageFilePath} alt="" />
        <PlayerSpectrumAnalyzer
          enabled={enabledAnalizer}
          spectrums={spectrums}
          onClick={() => setEnabledAnalizer(!enabledAnalizer)}
        />
        <div
          style={{ display: enabledAnalizer ? 'none' : 'block' }}
          onClick={() => setEnabledAnalizer(!enabledAnalizer)}
        >
          <StyledTitle>{info.title}</StyledTitle>
          <StyledAlbum>{info.albumArtist}</StyledAlbum>
          <StyledPlaybackTime>{info.currentTimeText}</StyledPlaybackTime>
          <StyledDuration>{info.durationText}</StyledDuration>
        </div>
        <StyledSlider>
          <input
            type="range"
            min={0}
            max={info.duration}
            value={info.currentTime}
            onChange={(ev) => onSeek(Number(ev.target.value))}
          />
        </StyledSlider>
      </StyledContainer>
    </StyledPlayerInformation>
  )
}
