import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateDateTime, showURL } from '../actions'
import Styles from './App.scss'
import Link from '../components/Link.js'
import Button from '../components/Button.js'

const component = ({url, requestingShowURL, dateTime, onUpdateTimeClick, onLinkClick}) => (
  <div className={Styles.main}>
    <Button
      label="Click"
      onClick={onUpdateTimeClick}
    />
    <span>{dateTime}</span>
    <Link
      label={url}
      url={url}
      onClick={onLinkClick} />
  </div>
)

component.propTypes = {
  url: PropTypes.string,
  requestingShowURL: PropTypes.bool,
  dateTime: PropTypes.string,
  onUpdateTimeClick: PropTypes.func,
  onLinkClick: PropTypes.func
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTimeClick: () => {
      dispatch(updateDateTime())
    },
    onLinkClick: (url) => {
      dispatch(showURL(url))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default Container
