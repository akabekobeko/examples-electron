import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Styles from './AppContainer.scss'
import Button from './Button.js'
import Link from './Link.js'

/**
 * Component for application container.
 */
export default class AppContainer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {object} props Properties.
   */
  constructor (props) {
    super(props)
    this._onChangeBind = this._onChange.bind(this)
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
    const action = this.props.context.sampleAction
    const store  = this.props.context.sampleStore

    return (
      <div className={Styles.main}>
        <Button
          label="Click"
          onClick={() => action.updateDatetime()}
        />
        <span>{store.datetime}</span>
        <Link
          label={store.url}
          url={store.url}
          onClick={() => action.showURL(store.url)}
        />
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
    if (!(area)) {
      return
    }

    ReactDOM.render(<AppContainer context={context} />, area)
  }
}

AppContainer.propTypes = {
  context: PropTypes.object
}
