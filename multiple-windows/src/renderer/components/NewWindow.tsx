import React from 'react'
import styled from 'styled-components'
import { Theme } from '../Theme'
import { Button } from './Button'

type Props = {
  onClick: () => void
}

const StyledNewWindow = styled.fieldset`
  border: solid 1px ${(props) => props.theme.colors.grayDark};
`

/**
 * Component of a contorol for create new window.
 */
export const NewWindow: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledNewWindow>
      <legend>Window</legend>
      <Button
        label="New Window"
        labelColor={Theme.colors.white}
        backgroundColor={Theme.colors.blue}
        onClick={onClick}
      />
    </StyledNewWindow>
  )
}
