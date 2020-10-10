import React from 'react'
import styled from 'styled-components'
import { Message } from './Message'
import { NewWindow } from './NewWindow'

export type StateByProps = {
  message: string
  windowIds: number[]
}

export type DispatchByProps = {
  onRequestSend?: (targetWindowId: number, message: string) => void
  onRequestCreateNewWindow?: () => void
}

type Props = StateByProps & DispatchByProps

const StyledApp = styled.form`
  padding: 1rem;
`

/**
 * Component of the entry point on application.
 */
export const App: React.FC<Props> = ({
  message = '',
  windowIds = [],
  onRequestSend = () => {},
  onRequestCreateNewWindow = () => {}
}) => (
  <StyledApp>
    <NewWindow onClick={onRequestCreateNewWindow} />
    <Message message={message} windowIds={windowIds} onSend={onRequestSend} />
  </StyledApp>
)
