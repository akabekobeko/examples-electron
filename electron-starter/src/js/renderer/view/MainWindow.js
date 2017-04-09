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

    this._onChangeBind      = this._onChange.bind(this)
    this._onClickButtonBind = this._onClickButton.bind(this)
    this._onClickLinkBind   = this._onClickLink.bind(this)

    /**
     * State of component.
     * @type {Object}
     */
    this.state = {
      url: 'https://github.com/akabekobeko/examples-electron'
    }
  }

  /**
   * Occurs when a component mounted.
   */
  componentDidMount () {
    this.props.context.sampleStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs before the component unmounted.
   */
  componentWillUnmount () {
    this.props.context.sampleStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className="sample">
        <span
          className="sample__button"
          onClick={this._onClickButtonBind}>
          Click
        </span>
        <span>{ this.props.context.sampleStore.datetime }</span>
        <div className="sample__repository">
          <i className="icon-github" /> <a href="#" onClick={this._onClickLinkBind}>{ this.state.url }</a>
        </div>
      </div>
    )
  }

  /**
   * Occurs when a button clicked.
   */
  _onClickButton () {
    this.props.context.sampleAction.updateDatetime()
  }

  /**
   * Occurs when a link clicked.
   */
  _onClickLink () {
    this.props.context.sampleAction.showURL(this.state.url)
  }

  /**
   * Occurs when a store updated.
   */
  _onChange () {
    this.forceUpdate()
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
