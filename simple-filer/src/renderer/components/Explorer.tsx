import React from 'react'
import { Folder, CurrentFolder } from '../Types'
import { explorer } from './Explorer.scss'
import FolderItem from './FolderItem'

export type StateByProps = {
  folders: Folder[]
  currentFolder: CurrentFolder
}

export type DispatchByProps = {
  enumSubFolders?: (folderPath: string) => void
  enumItems?: (folder: Folder) => void
}

type Props = StateByProps & DispatchByProps

const Explorer: React.FC<Props> = ({
  currentFolder,
  folders,
  enumSubFolders = () => {},
  enumItems = () => {}
}) => (
  <ul className={explorer}>
    {folders.map((folder, index) => (
      <FolderItem
        key={index}
        folder={folder}
        currentFolder={currentFolder}
        enumSubFolders={enumSubFolders}
        enumItems={enumItems}
      />
    ))}
  </ul>
)

export default Explorer
