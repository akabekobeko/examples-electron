import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

export type StateByProps = {}

export type DispatchByProps = {
  showOpenDialog?: () => void
  showSaveDialog?: () => void
  showMessageBox?: () => void
}

type Porps = StateByProps & DispatchByProps

const StyledDialogForm = styled.div`
  padding: 1rem;
  text-align: center;

  fieldset {
    border: solid 1px ${(props) => props.theme.colors.grayDark};
  }
`

/**
 * Component of a dialog api tester.
 */
export const DialogForm: React.FC<Porps> = ({
  showOpenDialog = () => {},
  showSaveDialog = () => {},
  showMessageBox = () => {}
}) => (
  <StyledDialogForm>
    <form>
      <fieldset>
        <legend>Dialog &amp; MessageBox</legend>
        <Button label="OpenDialog" onClick={showOpenDialog} />
        <Button label="SaveDialog" onClick={showSaveDialog} />
        <Button label="MessageBox" onClick={showMessageBox} />
      </fieldset>
    </form>
  </StyledDialogForm>
)
