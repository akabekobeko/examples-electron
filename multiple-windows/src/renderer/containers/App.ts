import { connect } from 'react-redux'
import { sendMessage, createNewWindow } from '../actions/'
import { AppState } from '../Types'
import { App, StateByProps, DispatchByProps } from '../components/App'

const mapStateToProps = (state: AppState): StateByProps => ({
  message: state.message,
  windowIds: state.windowIds
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  onRequestSend: (targetWindowId: number, message: string) => {
    dispatch(sendMessage(targetWindowId, message))
  },
  onRequestCreateNewWindow: () => {
    dispatch(createNewWindow())
  }
})

export const Container = connect(mapStateToProps, mapDispatchToProps)(App)
