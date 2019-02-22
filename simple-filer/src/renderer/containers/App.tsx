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
  enumItems,
  selectItem,
  openItem
} from '../actions/index'
import { Folder, FileViewItem, CurrentFolder } from '../Types'

type Props = {
  currentFolder?: CurrentFolder
  currentItem?: FileViewItem
  folders?: Folder[]
  items?: FileViewItem[]
  requestRegisterRootFolder?: () => void
  requestUnregisterRootFolder?: () => void
  requestEnumSubFolders?: (folderPath: string) => void
  requestEnumItems?: (folder: Folder) => void
  requestSelectItem?: (item: FileViewItem) => void
  requestOpenItem?: (itemPath: string) => void
}

const component: React.FC<Props> = ({
  currentFolder = {
    treeId: 0,
    path: '',
    isRoot: false
  },
  currentItem = undefined,
  folders = [],
  items = [],
  requestRegisterRootFolder = () => {},
  requestUnregisterRootFolder = () => {},
  requestEnumSubFolders = () => {},
  requestEnumItems = () => {},
  requestSelectItem = () => {},
  requestOpenItem = () => {}
}) => (
  <>
    <Toolbar
      registerRootFolder={requestRegisterRootFolder}
      unregisterRootFolder={requestUnregisterRootFolder}
      canUnregisterRootFolder={currentFolder.isRoot}
      openItem={requestOpenItem}
      currentItem={currentItem}
    />
    <div className="content">
      <SplitPane split="vertical" minSize={256} defaultSize={256}>
        <Explorer
          folders={folders}
          currentFolder={currentFolder}
          enumSubFolders={requestEnumSubFolders}
          enumItems={requestEnumItems}
        />
        <FileItemList
          items={items}
          currentItem={currentItem}
          selectItem={requestSelectItem}
          openItem={requestOpenItem}
        />
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
    },
    requestSelectItem: (item: FileViewItem) => {
      dispatch(selectItem(item))
    },
    requestOpenItem: (itemPath: string) => {
      dispatch(openItem(itemPath))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default App
