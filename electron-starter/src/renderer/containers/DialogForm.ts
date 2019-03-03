import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showOpenDialog, showSaveDialog, showMessageBox } from '../actions'
import { AppState } from '../Types'
import DialogForm, {
  StateByProps,
  DispatchByProps
} from '../components/DialogForm'

const mapStateToProps = (state: AppState): StateByProps => ({})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
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
