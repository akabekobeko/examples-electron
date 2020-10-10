import { connect } from 'react-redux'
import { selectItem, openItem } from '../actions/index'
import { FileViewItem, AppState } from '../RendererTypes'
import {
  FileItemList,
  StateByProps,
  DispatchByProps
} from '../components/FileItemList'

const mapStateToProps = (state: AppState): StateByProps => ({
  items: state.items,
  currentItem: state.currentItem
})

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  selectItem: (item: FileViewItem) => {
    dispatch(selectItem(item))
  },
  openItem: (itemPath: string) => {
    dispatch(openItem(itemPath))
  }
})

export const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileItemList)
