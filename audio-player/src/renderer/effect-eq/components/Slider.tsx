import React from 'react'
import styled from 'styled-components'
import { GraphicEqulizerParams as Params } from '../../Constants'

/**
 * Convert frequency to a string.
 * @param frequecy Value of frequecy.
 * @returns Converted value.
 */
const frequecyToString = (frequecy: number): string => {
  if (1000 <= frequecy) {
    const value = frequecy / 1000
    return value + 'K'
  }

  return String(frequecy)
}

type Props = {
  /** Index of bands. */
  index: number
  /**  Gain values of equalizer. */
  value: number
  /** Called when gain value is changed. */
  onChange: (index: number, value: number) => void
}

const StyledSlider = styled.input`
  position: absolute;
  top: 110px;
  width: 200px;
  background-color: transparent;
  cursor: pointer;
  transform: rotate(270deg);
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -9px;
    width: 10px;
    height: 20px;
    background-color: ${(props) => props.theme.colors.indigoDark};
  }

  &::-webkit-slider-runnable-track {
    margin-top: 6px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.grayDarkness};
  }
`

const StyledFrequecy = styled.div`
  user-select: none;
  position: absolute;
  top: 225px;
  font-size: 11px;
  cursor: default;
`

/**
 * Component of a slider on the equalizer.
 */
export const Slider: React.FC<Props> = ({ index, value, onChange }) => (
  <div key={index}>
    <StyledSlider
      style={{ left: -44 + index * 31 }}
      type="range"
      value={value}
      min={Params.GainMin}
      max={Params.GainMax}
      step={Params.GainStep}
      onChange={(ev) => onChange(index, Number(ev.target.value))}
    />
    <StyledFrequecy style={{ left: index * 32 + 46 }}>
      {frequecyToString(Params.Bands[index])}
    </StyledFrequecy>
  </div>
)
