import React from 'react'
import styled from 'styled-components'
import { Theme } from '../Theme'
import { Button } from './Button'

type Props = {
  message: string
  windowIds: number[]
  onSend: (targetWindowId: number, message: string) => void
}

const StyledMessage = styled.fieldset`
  margin-top: 1em;
  border: solid 1px ${(props) => props.theme.colors.grayDark};

  input[type='text'] {
    font-size: 1em;
    font-family: sans-serif;
    padding: 0.3em;
  }
`

/**
 * Component of a message viewer.
 */
export const Message: React.FC<Props> = ({ message, windowIds, onSend }) => {
  let select: HTMLSelectElement
  let input: HTMLInputElement

  return (
    <StyledMessage>
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
      <Button
        label="Send Message"
        labelColor={Theme.colors.white}
        backgroundColor={Theme.colors.green}
        onClick={() => {
          onSend(Number(select.value), input.value)
        }}
      />
    </StyledMessage>
  )
}
