import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

/**
 * Component for application main window.
 */
export default class MainWindow extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    /**
     * State of component.
     * @type {Object}
     */
    this.state = {
      message: '',
      targetWindowID: 0
    }

    this._onChangeBind                 = this._onChange.bind(this)
    this._onClickNewWindowButtonBind   = this._onClickNewWindowButton.bind(this)
    this._onChangeTargetWindowIdBind   = this._onChangeTargetWindowID.bind(this)
    this._onChangeSendMessageInputBind = this._onChangeSendMessageInput.bind(this)
    this._onClickSendMessageButtonBind = this._onClickSendMessageButton.bind(this)
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
      <div className="sample">
        <form>
          <fieldset>
            <legend>Window</legend>
            <div className="sample__button-new-window" onClick={this._onClickNewWindowButtonBind}>New Window</div>
          </fieldset>
          <fieldset>
            <legend>Message</legend>
            <p>
              <label>My Message : </label>
              <span>{ this.props.context.mainWindowStore.message }</span>
            </p>
            <p>
              <label>Target Window : </label>
              <select onChange={this._onChangeTargetWindowIdBind}>
                { this._renderTargetWindowIDs() }
              </select>
            </p>
            <p>
              <input
                type="text"
                value={this.state.message}
                onChange={this._onChangeSendMessageInputBind} />
            </p>
            <div className="sample__button-send-message" onClick={this._onClickSendMessageButtonBind}>Send Message</div>
          </fieldset>
        </form>
      </div>
    )
  }

  /**
   * Render for target window's identifiers.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderTargetWindowIDs () {
    return this.props.context.mainWindowStore.windowIDs.map((id) => {
      return (
        <option key={id} value={id}>{ id }</option>
      )
    })
  }

  /**
   * Occurs when a store updated.
   */
  _onChange () {
    const windowIDs = this.props.context.mainWindowStore.windowIDs
    if (this.state.targetWindowID === 0 && 0 < windowIDs.length) {
      this.setState({ targetWindowID: windowIDs[ 0 ] })
    } else {
      this.forceUpdate()
    }
  }

  /**
   * Occurs when a send message input changed.
   *
   * @param {Object} ev Event data.
   */
  _onChangeSendMessageInput (ev) {
    this.setState({ message: ev.target.value })
  }

  /**
   * Occurs when a target window's identifier changed.
   *
   * @param {Object} ev Event data.
   */
  _onChangeTargetWindowID (ev) {
    this.setState({ targetWindowID: Number(ev.target.value) })
  }

  /**
   * Occurs when a new window button clicked.
   */
  _onClickNewWindowButton () {
    this.props.context.mainWindowAction.createNewWindow()
  }

  /**
  * Occurs when a send message button clicked.
   */
  _onClickSendMessageButton () {
    this.props.context.mainWindowAction.sendMessage(this.state.targetWindowID, this.state.message)
  }

  /**
   * Setup for main window.
   */
  static setup (context) {
    const area = document.querySelector('.app')
    if (!(area)) { return }

    ReactDOM.render(<MainWindow context={context} />, area)
  }
}

MainWindow.propTypes = {
  context: PropTypes.object
}
