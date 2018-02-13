import React from 'react'
import PropTypes from 'prop-types'
import Styles from './HeaderSwitch.scss'

/**
 * Component of the ON/OFF switch control.
 *
 * @param {Object} props Properties of component.
 * @param {Boolean} props.checked Indicates that the switch is ON..
 * @param {Function} props.onChange Called when the switch state is changed.
 */
const HeaderSwitch = ({ checked, onChange }) => {
  return (
    <div
      className={Styles.switch}
      onClick={() => onChange(!checked)}>
      <input
        id="switch"
        name="switch"
        type="checkbox"
        className={Styles.checkbox}
        checked={checked}
        onChange={() => {
          // Dummy, Use only control clicks
        }}
      />
      <label className={Styles.label} />
    </div>
  )
}

HeaderSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default HeaderSwitch
