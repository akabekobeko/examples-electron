import './App.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Toolbar from '../components/Toolbar'
import Explorer from '../components/Explorer'
import FileItemList from '../components/FileItemList'
import SplitPane from 'react-split-pane'
import {
  registerRootFolder,
  unregisterRootFolder,
  enumSubFolders,
  enumItems
} from '../actions/index'
import { Folder, FileViewItem, CurrentFolder } from '../Types'

type Props = {
  currentFolder?: CurrentFolder
  folders?: Folder[]
  items?: FileViewItem[]
  requestRegisterRootFolder?: () => void
  requestUnregisterRootFolder?: () => void
  requestEnumSubFolders?: (folderPath: string) => void
  requestEnumItems?: (folder: Folder) => void
}

const component: React.FC<Props> = ({
  currentFolder = {
    treeId: 0,
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
          currentFolder={currentFolder}
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
    requestUnregisterRootFolder: () => {
      dispatch(unregisterRootFolder())
    },
    requestEnumSubFolders: (folderPath: string) => {
      dispatch(enumSubFolders(folderPath))
    },
    requestEnumItems: (folder: Folder) => {
      dispatch(enumItems(folder))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default App
