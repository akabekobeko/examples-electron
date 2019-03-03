import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { selectItem, openItem } from '../actions/index'
import { FileViewItem, AppState } from '../Types'
import FileItemList, {
  StateByProps,
  DispatchByProps
} from '../components/FileItemList'

const mapStateToProps = (state: AppState): StateByProps => ({
  items: state.items,
  currentItem: state.currentItem
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  selectItem: (item: FileViewItem) => {
    dispatch(selectItem(item))
  },
  openItem: (itemPath: string) => {
    dispatch(openItem(itemPath))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileItemList)

export default Container
