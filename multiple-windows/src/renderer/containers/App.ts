import { connect } from 'react-redux'
import { sendMessage, createNewWindow } from '../actions/'
import { Dispatch } from 'redux'
import { AppState } from '../Types'
import App from '../components/App'

const mapStateToProps = (state: AppState) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onRequestSend: (targetWindowId: number, message: string) => {
      dispatch(sendMessage(targetWindowId, message))
    },
    onRequestCreateNewWindow: () => {
      dispatch(createNewWindow())
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Container
