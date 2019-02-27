import React from 'react'
import Link from '../components/Link'
import Button from '../components/Button'
import { area } from './BasicFunction.scss'

type Props = {
  url: string
  dateTime: string
  updateTime?: () => void
  showURL?: (url: string) => void
}

const BasicFunction: React.FC<Props> = ({
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

export default BasicFunction
