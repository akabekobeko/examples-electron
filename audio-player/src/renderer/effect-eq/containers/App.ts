import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  connect as connectEffector,
  selectPreset,
  updateGain
} from '../actions'
import { AppState } from '../Types'
import App, { StateByProps, DispatchByProps } from '../components/App'

const mapStateToProps = (state: AppState): StateByProps => ({
  connected: state.connected,
  presetIndex: state.presetIndex,
  gains: state.gains
})

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchByProps => ({
  selectPreset: (presetIndex) => {
    dispatch(selectPreset(presetIndex))
  },
  connectEffector: (connected) => {
    dispatch(connectEffector(connected))
  },
  updateGain: (index, value) => {
    dispatch(updateGain(index, value))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Container
