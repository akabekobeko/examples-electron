import React from 'react'
import { Link } from '../components/Link'
import { Button } from '../components/Button'
import { area } from './BasicFunction.scss'

export type StateByProps = {
  url: string
  dateTime: string
}

export type DispatchByProps = {
  updateTime?: () => void
  showURL?: (url: string) => void
}

type Props = StateByProps & DispatchByProps

/**
 * Component of the basic functions.
 */
export const BasicFunction: React.FC<Props> = ({
  url,
  dateTime,
  updateTime = () => {},
  showURL = () => {}
}) => (
  <div className={area}>
    <Button label="Click" onClick={updateTime} />
    <span>{dateTime}</span>
    <Link label={url} url={url} icon="icon_github" onClick={showURL} />
  </div>
)
