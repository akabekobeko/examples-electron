import React from 'react'
import Message from './Message'
import NewWindow from './NewWindow'

type Props = {
  message?: string
  windowIds?: number[]
  onRequestSend?: (targetWindowId: number, message: string) => void
  onRequestCreateNewWindow?: () => void
}

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
