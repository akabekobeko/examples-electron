import styled from 'styled-components'
import { Theme } from '../Theme'

export const Icon = styled.i<{ icon: string; color: string }>`
  font-family: 'icon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  // Better Font Rendering
  -webkit-font-smoothing: antialiased;

  color: ${(props) => props.color};

  &:before {
    content: '${(props) => props.icon}';
  }
`

export const IconDisable = styled(Icon)`
  color: ${Theme.colors.gray};
`
