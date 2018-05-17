import React from 'react'
import PropTypes from 'prop-types'
import Link from '../components/Link.js'
import { connect } from 'react-redux'
import { showURL } from '../actions'

const component = ({ url, onClick }) => (
  <Link label={url} url={url} onClick={onClick} />
)

component.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func
}
const mapStateToProps = (state) => {
  return state.showURL
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (url) => {
      dispatch(showURL(url))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default Container
