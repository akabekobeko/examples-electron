import { connect } from 'react-redux'
import { sendMessage, createNewWindow } from '../actions/'
import { Dispatch } from 'redux'
import { AppState } from '../Types'
import App, { StateByProps, DispatchByProps } from '../components/App'

const mapStateToProps = (state: AppState): StateByProps => ({
  message: state.message,
  windowIds: state.windowIds
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  onRequestSend: (targetWindowId: number, message: string) => {
    dispatch(sendMessage(targetWindowId, message))
  },
  onRequestCreateNewWindow: () => {
    dispatch(createNewWindow())
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Container
