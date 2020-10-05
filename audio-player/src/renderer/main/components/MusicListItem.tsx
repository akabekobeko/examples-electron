import React from 'react'
import styled from 'styled-components'
import { Music } from '../models/Music'
import { secondsToString } from '../Util'

type Props = {
  /** Target music. */
  music: Music
  /** `true` if selected. */
  selected: boolean
  /** `true` if playing. */
  playing: boolean
  /** Called when the music is selected. */
  onSelect: (music: Music) => void
  /** Called when the music is played or paused. */
  onPlay: (music: Music) => void
}

const StyledMusicListItem = styled.div`
  position: relative;
  width: 100%;
  height: 18px;
  padding: 4px 0;
`

const StyledMusicListItemSelected = styled(StyledMusicListItem)`
  background-color: ${(props) => props.theme.colors.blueLight};
`

const StlyedIcon = styled.div`
  position: absolute;
  left: 4px;
  width: 20px;
  bottom: 2px;
  font-size: 16px;
  text-align: center;
`

const StyledTrac = styled.div`
  position: absolute;
  left: 24px;
  width: 20px;
  bottom: 2px;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.colors.grayDarkness};
`

const StyledTitle = styled.div`
  position: absolute;
  left: 52px;
  right: 52px;
  bottom: 2px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledDuration = styled.div`
  position: absolute;
  right: 4px;
  bottom: 2px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.grayDarkness};
`

export const MusicListItem: React.FC<Props> = ({
  music,
  selected,
  playing,
  onSelect,
  onPlay
}) => {
  const Item = selected ? StyledMusicListItemSelected : StyledMusicListItem
  return (
    <Item onClick={() => onSelect(music)} onDoubleClick={() => onPlay(music)}>
      <StlyedIcon>{playing ? <i className={`icon-play`} /> : null}</StlyedIcon>
      <StyledTrac>{music.track}</StyledTrac>
      <StyledTitle title={music.title}>{music.title}</StyledTitle>
      <StyledDuration>{secondsToString(music.duration)}</StyledDuration>
    </Item>
  )
}
