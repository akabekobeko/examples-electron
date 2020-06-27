import { connect } from 'react-redux'
import { selectMusic, openWithPlay } from '../actions'
import { AppState, PlaybackState } from '../Types'
import {
  AlbumList,
  StateByProps,
  DispatchByProps
} from '../components/AlbumList'
import { Music } from '../models/Music'

const mapStateToProps = (state: AppState): StateByProps => ({
  albums: state.currentArtist ? state.currentArtist.albums : [],
  currentMusic: state.currentMusic,
  playingMusic:
    state.playbackState === PlaybackState.Stopped ? null : state.currentMusic
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  selectMusic: (music: Music) => {
    dispatch(selectMusic(music))
  },
  openWithPlay: (music: Music) => {
    dispatch(openWithPlay(music))
  }
})

export const Container = connect(mapStateToProps, mapDispatchToProps)(AlbumList)
