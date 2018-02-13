import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Link.scss'

/**
 * Component of button.
 *
 * @param {Object} props Properties of component.
 * @param {String} props.label Display text.
 * @param {String} props.url Link URL.
 * @param {Function} props.onClick Called when the link is clicked.
 */
const Link = ({ label, url, onClick }) => {
  return (
    <div className={Styles.link}>
      <i className="icon-github" /> <a href="#" onClick={onClick}>{label}</a>
    </div>
  )
}

Link.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Link
