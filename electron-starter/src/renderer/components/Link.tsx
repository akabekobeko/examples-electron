import React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'

type Props = {
  label: string
  url: string
  icon?: string
  onClick: (url: string) => void
}

const StyledLink = styled.div`
  a,
  a:link,
  a:visited {
    margin-left: 0.3rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.blue};
  }

  a:hover,
  a:active {
    color: ${(props) => props.theme.colors.red};
  }
`

/**
 * Component of a hyper link of web page.
 */
export const Link: React.FC<Props> = ({ label, url, icon, onClick }) => (
  <StyledLink>
    {icon ? <Icon icon={icon} /> : null}
    <a
      href="#"
      onClick={() => {
        onClick(url)
      }}
    >
      {label}
    </a>
  </StyledLink>
)
