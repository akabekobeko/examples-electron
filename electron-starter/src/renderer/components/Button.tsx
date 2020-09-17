import React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  onClick: () => void
}

const StyledButton = styled.span`
  user-select: none;
  cursor: pointer;
  display: inline-block;
  margin: 1em;
  padding: 0.3em 0.5em;
  border-radius: 0.2em;
  border: solid 1px ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue};
`

/**
 * Component of a button control.
 */
export const Button: React.FC<Props> = ({ label, onClick }) => (
  <StyledButton onClick={onClick}>{label}</StyledButton>
)
