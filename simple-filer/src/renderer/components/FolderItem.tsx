import React, { useState } from 'react'
import { Folder } from "../../common/TypeAliases";
import { requestEnumItems } from '../actions';
import { folderitem, subfolder, name } from './FolderItem.scss'

type Props = {
  folder: Folder
  enumItems: (folderPath: string) => void
}

const FolderItem: React.FC<Props> = ({ folder, enumItems }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={folderitem}>
      <div
        onClick={() => {
          setExpanded(!expanded)
          enumItems(folder.path)
        }}
      >
        <i
          className={expanded ? 'icon_triangle_down' : 'icon_triangle_right'}
          onClick={(ev) => {
            ev.stopPropagation()
            setExpanded(!expanded)
          }}
        />
        <i className="icon_folder" />
        <span className={name}>{folder.name}</span>
      </div>
      {(!expanded || folder.subFolders.length === 0) ? null : (
        <ul className={subfolder}>
          {folder.subFolders.map((subFolder, index) =>
            <li key={index}>
              <FolderItem folder={subFolder} enumItems={enumItems} />
            </li>
            )}
        </ul>
      )}
    </div>
  )
}

export default FolderItem
