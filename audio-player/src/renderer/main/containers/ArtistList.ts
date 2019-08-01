import { connect } from 'react-redux'
import { selectArtist } from '../actions'
import { AppState } from '../Types'
import ArtistList, {
  StateByProps,
  DispatchByProps
} from '../components/ArtistList'
import Artist from '../models/Artist'

const mapStateToProps = (state: AppState): StateByProps => ({
  artists: state.artists,
  currentArtist: state.currentArtist
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  selectArtist: (artist: Artist) => {
    dispatch(selectArtist(artist))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistList)

export default Container
