import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { selectMusic, openWithPlay } from '../actions'
import { AppState, PlaybackState } from '../Types'
import AlbumList, {
  StateByProps,
  DispatchByProps
} from '../components/AlbumList'
import Music from '../models/Music'

const mapStateToProps = (state: AppState): StateByProps => ({
  currentArtist: state.currentArtist,
  currentMusic: state.currentMusic,
  playingMusic:
    state.playbackState === PlaybackState.Stopped ? null : state.currentMusic
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  selectMusic: (music: Music) => {
    dispatch(selectMusic(music))
  },
  openWithPlay: (music: Music) => {
    dispatch(openWithPlay(music))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumList)

export default Container
