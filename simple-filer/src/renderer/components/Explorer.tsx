import React from 'react'
import { explorer } from './Explorer.scss'
import { Folder } from '../../common/Types'
import FolderItem from './FolderItem'

type Props = {
  folders: Folder[]
  currentFolderPath: string
  enumSubFolders: (folderPath: string) => void
  enumItems: (folderPath: string) => void
}

const Explorer: React.FC<Props> = ({
  currentFolderPath,
  folders,
  enumSubFolders,
  enumItems
}) => (
  <ul className={explorer}>
    {folders.map((folder, index) => (
      <FolderItem
        key={index}
        folder={folder}
        currentFolderPath={currentFolderPath}
        enumSubFolders={enumSubFolders}
        enumItems={enumItems}
      />
    ))}
  </ul>
)

export default Explorer
