import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Message.scss'

/**
 * Compoennt of message view.
 *
 * @param {Object} props Properties.
 * @param {Number[]} props.windowIDs Identifies of active window.
 * @param {Function} props.onSend Called when an send message is executed.
 */
const Message = ({message, windowIDs, onSend}) => {
  let select
  let input

  return (
    <fieldset className={Styles.container}>
      <legend>Message</legend>
      <p>
        <label>My Message : </label>
        <span>{message}</span>
      </p>
      <p>
        <label>Target Window : </label>
        <select
          ref={(elm) => {
            select = elm
          }}>
          {windowIDs.map((id) => <option key={id} value={id}>{id}</option>)}
        </select>
      </p>
      <p>
        <input
          type="text"
          ref={(elm) => {
            input = elm
          }} />
      </p>
      <div
        className={Styles.button}
        onClick={() => {
          onSend(Number(select.value), input.value)
        }}>
          Send Message
      </div>
    </fieldset>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  windowIDs: PropTypes.array,
  onSend: PropTypes.func
}

export default Message
