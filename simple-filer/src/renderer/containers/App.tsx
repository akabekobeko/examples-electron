import './App.scss'
import React from 'react'
import { connect, Provider } from 'react-redux'
import { Dispatch } from 'redux'
import Toolbar from '../components/Toolbar'
import Explorer from '../components/Explorer'
import FileItemList from '../components/FileItemList'
import SplitPane from 'react-split-pane'
import { addRootFolder } from '../actions/index'
import { AppState } from '../reducers/index'

type Props = {
  requestAddRootFolder?: () => void
}

const component: React.SFC<Props> = ({
  requestAddRootFolder = () => {}
}) => (
  <>
    <Toolbar
      onClickAddRootFolder={requestAddRootFolder}
    />
    <div className="content">
      <SplitPane split="vertical" minSize={256} defaultSize={256}>
        <Explorer />
        <FileItemList />
      </SplitPane>
    </div>
  </>
)

const mapStateToProps = (state: AppState) => {
  return state
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    requestAddRootFolder: () => {
      dispatch(addRootFolder())
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default App
