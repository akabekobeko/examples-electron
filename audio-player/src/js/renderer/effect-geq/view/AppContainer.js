import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AppContainer.scss'
import Header from './HeaderContainer.js'
import Gain from './GainContainer.js'

/**
 * A component of application container..
 */
export default class AppContainer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {object} props Properties。
   */
  constructor (props) {
    super(props)
    this._onChangeBind = this._onChange.bind(this)
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount () {
    this.props.context.effectGraphicEqualizerStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount () {
    this.props.context.effectGraphicEqualizerStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    const store = this.props.context.effectGraphicEqualizerStore
    const action = this.props.context.effectGraphicEqualizerAction

    return (
      <div className={Styles.effector}>
        <Header
          presets={store.presetNames}
          presetIndex={store.presetNumber}
          connected={store.connect}
          onPresetSelect={(index) => action.selectPreset(index)}
          onConnect={(connected) => action.connect(connected)}
        />
        <Gain
          gains={store.gains}
          onChange={(index, value) => action.updateGain(index, value)}
        />
      </div>
    )
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange () {
    this.forceUpdate()
  }
}

AppContainer.propTypes = {
  context: PropTypes.object
}
