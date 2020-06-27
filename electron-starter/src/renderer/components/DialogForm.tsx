import React from 'react'
import { Button } from './Button'
import { area } from './DialogForm.scss'

export type StateByProps = {}

export type DispatchByProps = {
  showOpenDialog?: () => void
  showSaveDialog?: () => void
  showMessageBox?: () => void
}

type Porps = StateByProps & DispatchByProps

/**
 * Component of a dialog api tester.
 */
export const DialogForm: React.FC<Porps> = ({
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
