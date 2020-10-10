import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  labelColor: string
  backgroundColor: string
  onClick: () => void
}

const StyledButton = styled.span<{
  labelColor: string
  backgroundColor: string
}>`
  user-select: none;
  cursor: pointer;
  display: inline-block;
  margin: 1em;
  padding: 0.3em 0.5em;
  border-radius: 0.2em;
  border: solid 1px ${(props) => props.labelColor};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.backgroundColor};
`

/**
 * Component of a button control.
 */
export const Button: React.FC<Props> = ({
  label,
  labelColor,
  backgroundColor,
  onClick
}) => (
  <StyledButton
    labelColor={labelColor}
    backgroundColor={backgroundColor}
    onClick={onClick}
  >
    {label}
  </StyledButton>
)
