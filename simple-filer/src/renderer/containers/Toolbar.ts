import { connect } from 'react-redux'
import {
  registerRootFolder,
  unregisterRootFolder,
  openItem
} from '../actions/index'
import { AppState } from '../RendererTypes'
import { Toolbar, StateByProps, DispatchByProps } from '../components/Toolbar'

const mapStateToProps = (state: AppState): StateByProps => ({
  currentItem: state.currentItem,
  canUnregisterRootFolder: state.currentFolder.isRoot
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  registerRootFolder: () => {
    dispatch(registerRootFolder())
  },
  unregisterRootFolder: () => {
    dispatch(unregisterRootFolder())
  },
  openItem: (itemPath: string) => {
    dispatch(openItem(itemPath))
  }
})

export const Container = connect(mapStateToProps, mapDispatchToProps)(Toolbar)
