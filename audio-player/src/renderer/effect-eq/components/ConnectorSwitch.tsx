import React from 'react'
import styled from 'styled-components'

type Props = {
  /** Indicates that the connector is ON. */
  connected: boolean
  /** Called when the connector state is changed. */
  onChange: (connected: boolean) => void
}

const CONNECTOR_SIZE = '24px'

const StyledConnectorSwitch = styled.div`
  user-select: none;
  position: relative;
  width: calc(${CONNECTOR_SIZE} * 2);
`

const StyledChekBox = styled.input`
  display: none;

  &:checked {
  }

  & + label {
    background-color: ${(props) => props.theme.colors.indigoDark};
  }

  & + label,
  &:checked + label:before {
    border-color: ${(props) => props.theme.colors.indigoDark};
  }

  &:checked + label:before {
    right: 0;
  }
`

const StyledLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  height: ${CONNECTOR_SIZE};
  line-height: ${CONNECTOR_SIZE};
  border: 2px solid #999999;
  border-radius: ${CONNECTOR_SIZE};
  background-color: #eeeeee;
  transition: background-color 0.3s ease-in;

  &:before {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 22px;
    content: '';
    margin: 0;
    width: ${CONNECTOR_SIZE};
    background: ${(props) => props.theme.colors.white};
    border: 2px solid #999999;
    border-radius: ${CONNECTOR_SIZE};
    transition: all 0.3s ease-in 0s;
  }
`

/**
 * Conponent of a connector switch.
 */
export const ConnectorSwitch: React.FC<Props> = ({ connected, onChange }) => (
  <StyledConnectorSwitch onClick={() => onChange(!connected)}>
    <StyledChekBox
      id="switch"
      name="switch"
      type="checkbox"
      checked={connected}
      onChange={() => {
        // Dummy, Use only control clicks
      }}
    />
    <StyledLabel />
  </StyledConnectorSwitch>
)
