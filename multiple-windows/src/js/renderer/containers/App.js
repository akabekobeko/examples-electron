import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendMessage, createNewWindow } from '../actions/'
import Styles from './App.scss'
import Message from '../components/Message.js'
import NewWindow from '../components/NewWindow.js'

const component = ({ message, windowIDs, onSend, onRequestCreateNewWindow }) => (
  <div className={Styles.container}>
    <form>
      <NewWindow
        onClick={onRequestCreateNewWindow}
      />
      <Message
        message={message}
        windowIDs={windowIDs}
        onSend={onSend}
      />
    </form>
  </div>
)

component.propTypes = {
  message: PropTypes.string,
  windowIDs: PropTypes.array,
  onSend: PropTypes.func,
  onRequestCreateNewWindow: PropTypes.func
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSend: (id, message) => {
      dispatch(sendMessage(id, message))
    },
    onRequestCreateNewWindow: () => {
      dispatch(createNewWindow())
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export default Container
