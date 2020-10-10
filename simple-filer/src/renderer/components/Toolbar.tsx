import React from 'react'
import styled from 'styled-components'
import { FileViewItem } from '../RendererTypes'
import { Theme } from '../Theme'
import { Icon, IconDisable } from './Icon'

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

/**
 * Get the root folder icon.
 * @param canUnregister Value of whether can unregister.
 * @param unregister Function to unregister.
 * @returns Icon.
 */
const getRootFolderIcon = (
  canUnregister: boolean,
  unregister: () => void
): JSX.Element => {
  return canUnregister ? (
    <Icon
      icon={Theme.icons.circleWithMinus}
      color={Theme.colors.text}
      title="Unregister root folder"
      onClick={() => {
        if (canUnregister) {
          unregister()
        }
      }}
    />
  ) : (
    <IconDisable
      icon={Theme.icons.circleWithMinus}
      color={Theme.colors.text}
      title="Unregister root folder"
      onClick={() => {
        if (canUnregister) {
          unregister()
        }
      }}
    />
  )
}

/**
 * Get the play icon.
 * @param currentItem Item (File or Folder) of current.
 * @param openItem Function to open an item.
 * @returns Icon.
 */
const getPlayIcon = (
  currentItem: FileViewItem | undefined,
  openItem: (itemPath: string) => void
) => {
  return currentItem ? (
    <Icon
      icon={Theme.icons.controllerPlay}
      color={Theme.colors.text}
      title="Open the selected item with an operating system (Shell)."
      onClick={() => {
        if (currentItem) {
          openItem(currentItem.item.path)
        }
      }}
    />
  ) : (
    <IconDisable
      icon={Theme.icons.controllerPlay}
      color={Theme.colors.text}
      title="Open the selected item with an operating system (Shell)."
    />
  )
}

const StyledToolbar = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.grayLightness};
  height: 2rem;
  padding: 0.5rem;
  border-bottom: solid 1px ${(props) => props.theme.colors.gray};

  i {
    padding-right: 0.5rem;
  }
`

/**
 * Component of the toolbar.
 */
export const Toolbar: React.SFC<Props> = ({
  currentItem,
  canUnregisterRootFolder,
  registerRootFolder = () => {},
  unregisterRootFolder = () => {},
  openItem = (itemPath: string) => {}
}) => (
  <StyledToolbar>
    <Icon
      icon={Theme.icons.circleWithPlus}
      color={Theme.colors.text}
      title="Register root folder"
      onClick={registerRootFolder}
    />
    {getRootFolderIcon(canUnregisterRootFolder, unregisterRootFolder)}
    {getPlayIcon(currentItem, openItem)}
  </StyledToolbar>
)
