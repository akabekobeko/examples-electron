import React from 'react'
import { toolbar } from './Toolbar.scss'

type Props = {
  registerRootFolder: () => void
  unregisterRootFolder: () => void
  canUnregisterRootFolder: boolean
}

const Toolbar: React.SFC<Props> = ({
  registerRootFolder,
  unregisterRootFolder,
  canUnregisterRootFolder
}) => (
  <div className={toolbar}>
    <i
      className="icon_circle_with_plus"
      onClick={registerRootFolder}
      title="Register root folder"
    />
    <i
      className={
        canUnregisterRootFolder
          ? 'icon_circle_with_minus'
          : 'icon_circle_with_minus disable'
      }
      onClick={unregisterRootFolder}
      title="Unregister root folder"
    />
  </div>
)

export default Toolbar
