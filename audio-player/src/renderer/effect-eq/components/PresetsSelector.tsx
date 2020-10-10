import React from 'react'
import styled from 'styled-components'
import { Presets } from '../Constants'

type Props = {
  /** The index of the selected option. */
  presetIndex: number
  /** Called when the option selection is changed. */
  onSelect: (presetIndex: number) => void
}

const StyledPresetsSelector = styled.div`
  position: relative;
  height: 28px;
  background-color: ${(props) => props.theme.colors.indigoDark};
  border: solid 1px ${(props) => props.theme.colors.indigoDark};
  border-radius: 2px;
`

const StyledDropDown = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const StyledSelect = styled.select`
  user-select: none;
  -webkit-appearance: none;
  z-index: 1;
  position: absolute;
  width: 100%;
  padding: 0.3em 24px 0.3em 0.5em;
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.colors.indigoDark};
  font-family: system-ui, sans-serif;
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`

export const PresetsSelector: React.FC<Props> = ({ presetIndex, onSelect }) => (
  <StyledPresetsSelector>
    <StyledDropDown>
      <StyledSelect
        value={presetIndex}
        onChange={(ev) => onSelect(Number(ev.target.value))}
      >
        {Presets.map((preset, index) => (
          <option key={index} value={index}>
            {preset.name}
          </option>
        ))}
      </StyledSelect>
    </StyledDropDown>
  </StyledPresetsSelector>
)
