import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  registerRootFolder,
  unregisterRootFolder,
  openItem
} from '../actions/index'
import { AppState } from '../Types'
import Toolbar from '../components/Toolbar'

const mapStateToProps = (state: AppState) => {
  return {
    currentItem: state.currentItem,
    canUnregisterRootFolder: state.currentFolder.isRoot
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    registerRootFolder: () => {
      dispatch(registerRootFolder())
    },
    unregisterRootFolder: () => {
      dispatch(unregisterRootFolder())
    },
    openItem: (itemPath: string) => {
      dispatch(openItem(itemPath))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)

export default Container
