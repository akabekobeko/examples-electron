import React from 'react'
import { toolbar } from './Toolbar.scss'

type Props = {
  onClickAddRootFolder: () => void
}

const Toolbar: React.SFC<Props> = ({
  onClickAddRootFolder
}) => (
  <div className={toolbar}>
    <span className="icon_circle_with_plus" onClick={onClickAddRootFolder} />
  </div>
)

export default Toolbar
