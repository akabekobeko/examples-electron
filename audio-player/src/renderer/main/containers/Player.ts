import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, PlaybackState, MusicSelectPosition } from '../Types'
import Player, { StateByProps, DispatchByProps } from '../components/Player'
import { play, changeVolume, importMusic } from '../actions'

const mapStateToProps = (state: AppState): StateByProps => ({
  playbackState: state.playbackState,
  currentTime: state.currentTime,
  volume: state.volume,
  spectrums: state.spectrums,
  playingMusic:
    state.playbackState === PlaybackState.Stopped ? null : state.currentMusic
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  onPlay: () => {
    dispatch(play())
  },
  onPrev: () => {
    /*
    const music = getState().currentMusic
    if (music) {
      dispatch(selectMusic(music, MusicSelectPosition.Prev))
    }
    */
  },
  onNext: () => {
    /*
    const music = getState().currentMusic
    if (music) {
      dispatch(selectMusic(music, MusicSelectPosition.Next))
    }
    */
  },
  onChangeVolume: (value) => {
    dispatch(changeVolume(value))
  },
  importMusic: () => {
    dispatch(importMusic())
  },
  removeMusic: () => {
    /*
    const music = getState().currentMusic
    if (music) {
      removeMusic(music)
    }
    */
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default Container
