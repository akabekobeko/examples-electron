import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Styles from './AppContainer.scss'
import NewWindow from './NewWindow.js'
import Message from './Message.js'

/**
 * Component for application container.
 */
export default class AppContainer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)
    this._onChangeBind = this._onChange.bind(this)
  }

  /**
   * Occurs when a component mounted.
   */
  componentDidMount () {
    this.props.context.mainWindowStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs before the component unmounted.
   */
  componentWillUnmount () {
    this.props.context.mainWindowStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className={Styles.container}>
        <form>
          <NewWindow
            onClick={() => this.props.context.mainWindowAction.createNewWindow()}
          />
          <Message
            message={this.props.context.mainWindowStore.message}
            windowIDs={this.props.context.mainWindowStore.windowIDs}
            onSend={(id, message) => this.props.context.mainWindowAction.sendMessage(id, message)}
          />
        </form>
      </div>
    )
  }

  /**
   * Occurs when a store updated.
   */
  _onChange () {
    this.forceUpdate()
  }

  /**
   * Setup for application container.
   */
  static setup (context) {
    const area = document.querySelector('.app')
    if (!(area)) { return }

    ReactDOM.render(<AppContainer context={context} />, area)
  }
}

AppContainer.propTypes = {
  context: PropTypes.object
}
