import React, { useState } from 'react'
import { Folder } from '../../common/TypeAliases'
import { folderitem, subfolder, name } from './FolderItem.scss'

type Props = {
  folder: Folder
  enumItems: (folderPath: string) => void
  enumSubFolders: (folderPath: string) => void
}

const FolderItem: React.FC<Props> = ({ folder, enumItems, enumSubFolders }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li className={folderitem}>
      <div
        onClick={() => {
          enumItems(folder.path)
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
        <span className={name}>{folder.name}</span>
      </div>
      {!expanded || folder.subFolders.length === 0 ? null : (
        <ul className={subfolder}>
          {folder.subFolders.map((subFolder, index) => (
            <FolderItem key={index} folder={subFolder} enumItems={enumItems} enumSubFolders={enumSubFolders} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default FolderItem
