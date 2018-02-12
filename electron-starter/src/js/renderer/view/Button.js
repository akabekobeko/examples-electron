import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Button.scss'

/**
 * Component of button.
 *
 * @param {object} props Properties of component.
 * @param {string} props.label Display text.
 * @param {function} props.onClick Called when the button is clicked.
 */
const Button = ({label, onClick}) => {
  return (
    <span
      className={Styles.button}
      onClick={onClick}>
      {label}
    </span>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
