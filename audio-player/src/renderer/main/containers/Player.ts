import { connect } from 'react-redux'
import { AppState, PlaybackState } from '../Types'
import { Player, StateByProps, DispatchByProps } from '../components/Player'
import {
  openWithPlay,
  play,
  pause,
  next,
  seek,
  changeVolume,
  importMusic,
  removeMusic,
  showEffector
} from '../actions'
import { Music } from '../models/Music'

const mapStateToProps = (state: AppState): StateByProps => ({
  playbackState: state.playbackState,
  currentTime: state.currentTime,
  volume: state.volume,
  spectrums: state.spectrums,
  currentMusic:
    state.playbackState === PlaybackState.Stopped
      ? state.currentMusic
      : state.playingMusic
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  openWithPlay: (music: Music) => dispatch(openWithPlay(music)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  prev: () => dispatch(next(false)),
  next: () => dispatch(next()),
  seek: (position) => dispatch(seek(position)),
  changeVolume: (value) => dispatch(changeVolume(value)),
  importMusic: () => dispatch(importMusic()),
  removeMusic: () => dispatch(removeMusic()),
  showEffector: () => dispatch(showEffector())
})

export const Container = connect(mapStateToProps, mapDispatchToProps)(Player)
