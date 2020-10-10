import React from 'react'
import { Link } from '../components/Link'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { Theme } from '../Theme'

export type StateByProps = {
  url: string
  dateTime: string
}

export type DispatchByProps = {
  updateTime?: () => void
  showURL?: (url: string) => void
}

type Props = StateByProps & DispatchByProps

const StyledBasicFunction = styled.div`
  padding-bottom: 1rem;
  text-align: center;
`

/**
 * Component of the basic functions.
 */
export const BasicFunction: React.FC<Props> = ({
  url,
  dateTime,
  updateTime = () => {},
  showURL = () => {}
}) => (
  <StyledBasicFunction>
    <Button label="Click" onClick={updateTime} />
    <span>{dateTime}</span>
    <Link label={url} url={url} icon={Theme.icons.github} onClick={showURL} />
  </StyledBasicFunction>
)
