import React from 'react'
import Message from './Message'
import NewWindow from './NewWindow'

export type StateByProps = {
  message: string
  windowIds: number[]
}

export type DispatchByProps = {
  onRequestSend?: (targetWindowId: number, message: string) => void
  onRequestCreateNewWindow?: () => void
}

type Props = StateByProps & DispatchByProps

const App: React.FC<Props> = ({
  message = '',
  windowIds = [],
  onRequestSend = () => {},
  onRequestCreateNewWindow = () => {}
}) => (
  <>
    <form>
      <NewWindow onClick={onRequestCreateNewWindow} />
      <Message message={message} windowIds={windowIds} onSend={onRequestSend} />
    </form>
  </>
)

export default App
