import './App.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Toolbar from '../components/Toolbar'
import Explorer from '../components/Explorer'
import FileItemList from '../components/FileItemList'
import SplitPane from 'react-split-pane'
import { registerRootFolder, enumSubFolders, enumItems } from '../actions/index'
import { Folder } from '../../common/Types'
import { FileViewItem } from '../Types'

type Props = {
  currentFolder: {
    path: string
    isRoot: boolean
  }
  folders: Folder[]
  items: FileViewItem[]
  requestRegisterRootFolder: () => void
  requestUnregisterRootFolder: () => void
  requestEnumSubFolders: (folderPath: string) => void
  requestEnumItems: (folderPath: string) => void
}

const component: React.FC<Props> = ({
  currentFolder = {
    path: '',
    isRoot: false
  },
  folders = [],
  items = [],
  requestRegisterRootFolder = () => {},
  requestUnregisterRootFolder = () => {},
  requestEnumSubFolders = () => {},
  requestEnumItems = () => {}
}) => (
  <>
    <Toolbar
      registerRootFolder={requestRegisterRootFolder}
      unregisterRootFolder={requestUnregisterRootFolder}
      canUnregisterRootFolder={currentFolder.isRoot}
    />
    <div className="content">
      <SplitPane split="vertical" minSize={256} defaultSize={256}>
        <Explorer
          folders={folders}
          currentFolderPath={currentFolder.path}
          enumSubFolders={requestEnumSubFolders}
          enumItems={requestEnumItems}
        />
        <FileItemList items={items} />
      </SplitPane>
    </div>
  </>
)

const mapStateToProps = (state = {}) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    requestRegisterRootFolder: () => {
      dispatch(registerRootFolder())
    },
    requestEnumSubFolders: (folderPath: string) => {
      dispatch(enumSubFolders(folderPath))
    },
    requestEnumItems: (folderPath: string) => {
      dispatch(enumItems(folderPath))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default App
