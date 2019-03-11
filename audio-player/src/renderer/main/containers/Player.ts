import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, PlaybackState } from '../Types'
import Player, { StateByProps, DispatchByProps } from '../components/Player'

const mapStateToProps = (state: AppState): StateByProps => ({
  isPlaying: state.playbackState !== PlaybackState.Stopped,
  volume: 0,
  playingMusic:
    state.playbackState === PlaybackState.Stopped ? null : state.currentMusic,
  currentTime: 0
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default Container
