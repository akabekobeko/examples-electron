import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component for On/Off switch control.
 */
export default class OnOffSwitch extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickBind  = this._onClick.bind(this)
    this._onChangeBind = this._onChange.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div
        className="onoffswitch"
        onClick={this._onClickBind}>
        <input
          id="onoffswitch"
          name="onoffswitch"
          className="onoffswitch__checkbox"
          type="checkbox"
          checked={this.props.checked}
          onChange={this._onChangeBind} />
        <label
          className="onoffswitch__label" />
      </div>
    )
  }

  /**
   * Occurs when the switch is clicked.
   */
  _onClick () {
    const checked = !(this.props.checked)
    if (this.props.onChange) {
      this.props.onChange(checked)
    }
  }

  /**
   * Occurs when the switch is changed.
   * Also it required onChange If you want to specify a checked in checkbox.
   * However checkbox this function be changed is not called.
   */
  _onChange () {
    // Dummy
  }
}

OnOffSwitch.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool
}
