import styled from 'styled-components'

export const Icon = styled.i<{ icon: string }>`
  font-family: 'icon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  // Better Font Rendering
  -webkit-font-smoothing: antialiased;

  &:before {
    content: '${(props) => props.icon}';
  }
`
