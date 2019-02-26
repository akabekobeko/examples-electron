import React from 'react'
import { link } from './Link.scss'

type Props = {
  label: string
  url: string
  icon?: string
  onClick: (url: string) => void
}

const Link: React.FC<Props> = ({ label, url, icon, onClick }) => (
  <div className={link}>
    <i className={icon} />
    <a
      href="#"
      onClick={() => {
        onClick(url)
      }}
    >
      {label}
    </a>
  </div>
)

export default Link
