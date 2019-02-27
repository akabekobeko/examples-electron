import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { updateDateTime, showURL } from '../actions'
import { AppState } from '../Types'
import BasicFunction from '../components/BasicFunction'

const mapStateToProps = (state: AppState) => {
  return {
    url: state.url,
    dateTime: state.dateTime
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateTime: () => {
    dispatch(updateDateTime())
  },
  showURL: (url: string) => {
    dispatch(showURL(url))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicFunction)

export default Container
