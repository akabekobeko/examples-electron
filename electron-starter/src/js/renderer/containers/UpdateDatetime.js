import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button.js'
import { connect } from 'react-redux'
import { updateDateTime } from '../actions'

const component = ({ dateTime, onClick }) => (
  <React.Fragment>
    <Button
      label="Click"
      onClick={onClick}
    />
    <span>{dateTime}</span>
  </React.Fragment>
)

component.propTypes = {
  dateTime: PropTypes.string,
  onClick: PropTypes.func
}

const mapStateToProps = (state) => {
  return state.updateDateTime
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(updateDateTime())
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default Container
