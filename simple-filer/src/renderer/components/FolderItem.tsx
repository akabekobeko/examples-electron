import React, { useState } from 'react'
import styled from 'styled-components'
import { Folder, CurrentFolder } from '../RendererTypes'
import { Theme } from '../Theme'
import { Icon } from './Icon'

type Props = {
  folder: Folder
  currentFolder: CurrentFolder
  enumItems: (folder: Folder) => void
  enumSubFolders: (folderPath: string) => void
}

const StyledFolderItem = styled.li`
  user-select: none;
  list-style: none;
  list-style-position: inside;
  white-space: nowrap;
  overflow: hidden;

  .normal {
    padding: 0.2rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .selected {
    background-color: ${(props) => props.theme.colors.orangeLight};
    padding: 0.2rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    padding-left: 0.5rem;
  }

  .subfolder {
    padding-left: 1rem;
  }
`

/**
 * Component of an item on folder explorer.
 */
export const FolderItem: React.FC<Props> = ({
  folder,
  currentFolder,
  enumItems,
  enumSubFolders
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <StyledFolderItem>
      <div
        className={
          folder.treeId === currentFolder.treeId &&
          folder.path === currentFolder.path
            ? 'selected'
            : 'normal'
        }
        onClick={() => {
          if (
            folder.path !== currentFolder.path ||
            folder.treeId !== currentFolder.treeId
          ) {
            enumItems(folder)
          }
        }}
      >
        <Icon
          icon={expanded ? Theme.icons.triangleDown : Theme.icons.triangleRight}
          color={Theme.colors.text}
          onClick={(ev) => {
            ev.stopPropagation()

            // Only when the folder is opened to avoid waste
            if (!expanded) {
              enumSubFolders(folder.path)
            }

            setExpanded(!expanded)
          }}
        />
        <Icon icon={Theme.icons.folder} color={Theme.colors.blue} />
        <span>{folder.name}</span>
      </div>
      {!expanded || folder.subFolders.length === 0 ? null : (
        <ul className="subfolder">
          {folder.subFolders.map((subFolder, index) => (
            <FolderItem
              key={index}
              folder={subFolder}
              currentFolder={currentFolder}
              enumItems={enumItems}
              enumSubFolders={enumSubFolders}
            />
          ))}
        </ul>
      )}
    </StyledFolderItem>
  )
}
