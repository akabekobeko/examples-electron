import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showOpenDialog, showSaveDialog, showMessageBox } from '../actions'
import { AppState } from '../Types'
import DialogForm from '../components/DialogForm'

const mapStateToProps = (state: AppState) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  showOpenDialog: () => {
    dispatch(showOpenDialog())
  },
  showSaveDialog: () => {
    dispatch(showSaveDialog())
  },
  showMessageBox: () => {
    dispatch(showMessageBox())
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForm)

export default Container
