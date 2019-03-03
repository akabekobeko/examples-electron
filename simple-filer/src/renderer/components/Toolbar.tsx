import React from 'react'
import { toolbar } from './Toolbar.scss'
import { FileViewItem } from '../Types'

export type StateByProps = {
  currentItem?: FileViewItem
  canUnregisterRootFolder: boolean
}

export type DispatchByProps = {
  registerRootFolder?: () => void
  unregisterRootFolder?: () => void
  openItem?: (itemPath: string) => void
}

export type Props = StateByProps & DispatchByProps

const Toolbar: React.SFC<Props> = ({
  currentItem,
  canUnregisterRootFolder,
  registerRootFolder = () => {},
  unregisterRootFolder = () => {},
  openItem = () => {}
}) => (
  <div className={toolbar}>
    <i
      className="icon_circle_with_plus"
      title="Register root folder"
      onClick={registerRootFolder}
    />
    <i
      className={
        canUnregisterRootFolder
          ? 'icon_circle_with_minus'
          : 'icon_circle_with_minus disable'
      }
      title="Unregister root folder"
      onClick={() => {
        if (canUnregisterRootFolder) {
          unregisterRootFolder()
        }
      }}
    />
    <i
      className={
        currentItem ? 'icon_controller_play' : 'icon_controller_play disable'
      }
      title="Open the selected item with an operating system (Shell)."
      onClick={() => {
        if (currentItem) {
          openItem(currentItem.item.path)
        }
      }}
    />
  </div>
)

export default Toolbar
