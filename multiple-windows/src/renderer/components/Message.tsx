import React from 'react'
import * as Styles from './Message.scss'

type Props = {
  message: string
  windowIds: number[]
  onSend: (targetWindowId: number, message: string) => void
}

const Message: React.FC<Props> = ({ message, windowIds, onSend }) => {
  let select: HTMLSelectElement
  let input: HTMLInputElement

  return (
    <fieldset className={Styles.container}>
      <legend>Message</legend>
      <p>
        <label>Received message: </label>
        <span>{message}</span>
      </p>
      <p>
        <label>Target window: </label>
        <select
          ref={(elm: HTMLSelectElement) => {
            select = elm
          }}
        >
          {windowIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </p>
      <p>
        <input
          type="text"
          ref={(elm: HTMLInputElement) => {
            input = elm
          }}
        />
      </p>
      <div
        className={Styles.button}
        onClick={() => {
          onSend(Number(select.value), input.value)
        }}
      >
        Send Message
      </div>
    </fieldset>
  )
}

export default Message
