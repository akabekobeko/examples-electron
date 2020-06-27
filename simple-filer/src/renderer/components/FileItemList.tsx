import React from 'react'
import {
  list,
  header_right,
  list_item,
  list_item_select,
  value_type,
  value_size,
  value_permission,
  value_modified
} from './FileItemList.scss'
import { FileType, FileViewItem } from '../Types'

/**
 * Get icon from type of the file.
 * @param type Type of the file.
 * @returns Icon component.
 */
const getIcon = (type: FileType) => {
  switch (type) {
    case FileType.Text:
      return <i className="icon_text_document" />

    case FileType.Audio:
      return <i className="icon_music" />

    case FileType.Image:
      return <i className="icon_image" />

    case FileType.Video:
      return <i className="icon_video" />

    case FileType.Folder:
      return <i className="icon_folder" />

    default:
      return <i className=" icon_document" />
  }
}

export type StateByProps = {
  items: FileViewItem[]
  currentItem?: FileViewItem
}

export type DispatchByProps = {
  selectItem?: (item: FileViewItem) => void
  openItem?: (itemPath: string) => void
}

type Props = StateByProps & DispatchByProps

/**
 * Component of a file item list on current folder.
 */
export const FileItemList: React.FC<Props> = ({
  items,
  currentItem,
  selectItem = () => {},
  openItem = () => {}
}) => (
  <div className={list}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className={header_right}>Size</th>
          <th>Permission</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={
              currentItem && currentItem.item.path === item.item.path
                ? list_item_select
                : list_item
            }
            onClick={() => {
              selectItem(item)
            }}
            onDoubleClick={() => {
              selectItem(item)
              openItem(item.item.path)
            }}
          >
            <td>
              {getIcon(item.type)} {item.item.name}
            </td>
            <td className={value_type}>{item.type}</td>
            <td className={value_size}>{item.size}</td>
            <td className={value_permission}>{item.permission}</td>
            <td className={value_modified}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
