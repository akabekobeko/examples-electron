import './App.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Toolbar from '../components/Toolbar'
import Explorer from '../components/Explorer'
import FileItemList from '../components/FileItemList'
import SplitPane from 'react-split-pane'
import { addRootFolder, enumItems } from '../actions/index'
import { AppState } from '../reducers/index'
import { Folder } from '../../common/TypeAliases';

type Props = {
  folders?: Folder[]
  requestAddRootFolder?: () => void
  requestEnumItems?: (folderPath: string) => void
}

const component: React.FC<Props> = ({
  folders = [],
  requestAddRootFolder = () => {},
  requestEnumItems = () => {},
}) => (
  <>
    <Toolbar
      onClickAddRootFolder={requestAddRootFolder}
    />
    <div className="content">
      <SplitPane split="vertical" minSize={256} defaultSize={256}>
        <Explorer folders={folders} enumItems={requestEnumItems} />
        <FileItemList />
      </SplitPane>
    </div>
  </>
)

const mapStateToProps = (state = {}) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    requestAddRootFolder: () => {
      dispatch(addRootFolder())
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
