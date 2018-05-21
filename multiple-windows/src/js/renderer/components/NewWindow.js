import React from 'react'
import PropTypes from 'prop-types'
import Styles from './NewWindow.scss'

/**
 * Component of new window field.
 *
 * @param {Object} props Properties of component.
 * @param {Function} props.onClick Called when the button is clicked.
 */
const NewWindow = ({onClick}) => {
  return (
    <fieldset className={Styles.container}>
      <legend>Window</legend>
      <div className={Styles.button} onClick={onClick}>New Window</div>
    </fieldset>
  )
}

NewWindow.propTypes = {
  onClick: PropTypes.func
}

export default NewWindow
