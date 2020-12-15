import React from 'react'
import styled from 'styled-components'
import { GraphicEqualizerParams as Params } from '../Constants'

/**
 * Convert frequency to a string.
 * @param frequency Value of frequency.
 * @returns Converted value.
 */
const frequencyToString = (frequency: number): string => {
  if (1000 <= frequency) {
    const value = frequency / 1000
    return value + 'K'
  }

  return String(frequency)
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

const StyledFrequency = styled.div`
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
    <StyledFrequency style={{ left: index * 32 + 46 }}>
      {frequencyToString(Params.Bands[index])}
    </StyledFrequency>
  </div>
)
