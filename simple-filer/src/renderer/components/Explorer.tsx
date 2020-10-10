import React from 'react'
import { Folder, CurrentFolder } from '../RendererTypes'
import styled from 'styled-components'
import { FolderItem } from './FolderItem'

export type StateByProps = {
  folders: Folder[]
  currentFolder: CurrentFolder
}

export type DispatchByProps = {
  enumSubFolders?: (folderPath: string) => void
  enumItems?: (folder: Folder) => void
}

type Props = StateByProps & DispatchByProps

const StyledExplorer = styled.ul`
  background-color: ${(props) => props.theme.colors.white};
  height: 100%;
  overflow: scroll;
  margin: 0;
  padding: 0.5rem;
`

/**
 * Component of a folder explorer.
 */
export const Explorer: React.FC<Props> = ({
  currentFolder,
  folders,
  enumSubFolders = () => {},
  enumItems = () => {}
}) => (
  <StyledExplorer>
    {folders.map((folder, index) => (
      <FolderItem
        key={index}
        folder={folder}
        currentFolder={currentFolder}
        enumSubFolders={enumSubFolders}
        enumItems={enumItems}
      />
    ))}
  </StyledExplorer>
)
