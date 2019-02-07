import React from 'react'
import { explorer } from './Explorer.scss'
import { Folder } from '../../common/TypeAliases';
import FolderItem from './FolderItem';

type Props = {
  folders: Folder[]
  enumItems: (folderPath: string) => void
}

const Explorer: React.FC<Props> = ({ folders, enumItems }) => (
  <ul className={explorer}>
    {folders.map((folder, index) => (
      <li key={index}>
        <FolderItem folder={folder} enumItems={enumItems} />
      </li>)
    )}
  </ul>
)

export default Explorer
