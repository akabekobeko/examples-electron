import React from 'react'
import Button from './Button'
import { area } from './DialogForm.scss'

type Porps = {
  showOpenDialog?: () => void
  showSaveDialog?: () => void
  showMessageBox?: () => void
}

const DialogForm: React.FC<Porps> = ({
  showOpenDialog = () => {},
  showSaveDialog = () => {},
  showMessageBox = () => {}
}) => (
  <div className={area}>
    <form>
      <fieldset>
        <legend>Dialog &amp; MessageBox</legend>
        <Button label="OpenDialog" onClick={showOpenDialog} />
        <Button label="SaveDialog" onClick={showSaveDialog} />
        <Button label="MessageBox" onClick={showMessageBox} />
      </fieldset>
    </form>
  </div>
)

export default DialogForm
