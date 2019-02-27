import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { enumSubFolders, enumItems } from '../actions/index'
import { Folder, AppState } from '../Types'
import Explorer from '../components/Explorer'

const mapStateToProps = (state: AppState) => {
  return {
    folders: state.folders,
    currentFolder: state.currentFolder
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    enumSubFolders: (folderPath: string) => {
      dispatch(enumSubFolders(folderPath))
    },
    enumItems: (folder: Folder) => {
      dispatch(enumItems(folder))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Explorer)

export default Container
