import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, PlaybackState } from '../Types'
import Player, { StateByProps, DispatchByProps } from '../components/Player'
import {
  play,
  pause,
  next,
  changeVolume,
  getPlayTimeAndSpectrums,
  importMusic,
  removeMusic
} from '../actions'

const mapStateToProps = (state: AppState): StateByProps => ({
  playbackState: state.playbackState,
  currentTime: state.currentTime,
  volume: state.volume,
  spectrums: state.spectrums,
  playingMusic:
    state.playbackState === PlaybackState.Stopped ? null : state.currentMusic
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  prev: () => dispatch(next(false)),
  next: () => dispatch(next()),
  changeVolume: (value) => dispatch(changeVolume(value)),
  getPlayTimeAndSpectrums: () => dispatch(getPlayTimeAndSpectrums()),
  importMusic: () => dispatch(importMusic()),
  removeMusic: () => dispatch(removeMusic())
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default Container
