import React, { useState } from 'react'
import { Folder, CurrentFolder } from '../Types'
import { folderitem, subfolder, normal, selected } from './FolderItem.scss'

type Props = {
  folder: Folder
  currentFolder: CurrentFolder
  enumItems: (folder: Folder) => void
  enumSubFolders: (folderPath: string) => void
}

const FolderItem: React.FC<Props> = ({
  folder,
  currentFolder,
  enumItems,
  enumSubFolders
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className={folderitem}>
      <div
        className={
          folder.treeId === currentFolder.treeId &&
          folder.path === currentFolder.path
            ? selected
            : normal
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
        <i
          className={expanded ? 'icon_triangle_down' : 'icon_triangle_right'}
          onClick={(ev) => {
            ev.stopPropagation()

            // Only when the folder is opened to avoid waste
            if (!expanded) {
              enumSubFolders(folder.path)
            }

            setExpanded(!expanded)
          }}
        />
        <i className="icon_folder" />
        <span>{folder.name}</span>
      </div>
      {!expanded || folder.subFolders.length === 0 ? null : (
        <ul className={subfolder}>
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
    </li>
  )
}

export default FolderItem
