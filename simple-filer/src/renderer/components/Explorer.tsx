import React from 'react'
import { explorer } from './Explorer.scss'
import { Folder } from '../../common/TypeAliases'
import FolderItem from './FolderItem'

type Props = {
  folders: Folder[]
  enumSubFolders: (folderPath: string) => void
  enumItems: (folderPath: string) => void
}

const Explorer: React.FC<Props> = ({ folders, enumSubFolders, enumItems }) => (
  <ul className={explorer}>
    {folders.map((folder, index) => (
      <FolderItem key={index} folder={folder} enumSubFolders={enumSubFolders} enumItems={enumItems} />
    ))}
  </ul>
)

export default Explorer
