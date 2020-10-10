import React from 'react'
import styled from 'styled-components'
import { FileType, FileViewItem } from '../RendererTypes'
import { Theme } from '../Theme'
import { Icon } from './Icon'

/**
 * Get icon from type of the file.
 * @param type Type of the file.
 * @returns Icon component.
 */
const getIcon = (type: FileType) => {
  switch (type) {
    case FileType.Text:
      return <Icon icon={Theme.icons.textDocument} color={Theme.colors.green} />

    case FileType.Audio:
      return <Icon icon={Theme.icons.music} color={Theme.colors.orange} />

    case FileType.Image:
      return <Icon icon={Theme.icons.image} color={Theme.colors.red} />

    case FileType.Video:
      return <Icon icon={Theme.icons.video} color={Theme.colors.purple} />

    case FileType.Folder:
      return <Icon icon={Theme.icons.folder} color={Theme.colors.blue} />

    default:
      return <Icon icon={Theme.icons.document} color={Theme.colors.text} />
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

const StyledFileItemList = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  overflow: scroll;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    user-select: none;
    background-color: ${(props) => props.theme.colors.grayLight};
    border: solid 1px ${(props) => props.theme.colors.gray};
    border-top: none;
    padding: 0.3rem;
    font-weight: normal;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }

  td {
    border: solid 1px ${(props) => props.theme.colors.gray};
    padding: 0.3rem;
  }

  .header_right {
    text-align: right;
  }

  .list_item:hover {
    background-color: ${(props) => props.theme.colors.orangeLightness};
  }

  .list_item_select {
    background-color: ${(props) => props.theme.colors.orangeLight};
  }

  .value_type {
    text-align: center;
  }

  .value_size {
    text-align: right;
  }

  .value_permission {
    text-align: center;
    font-family: monospace, serif;
  }

  .value_modified {
    text-align: center;
  }
`

/**
 * Component of a file item list on current folder.
 */
export const FileItemList: React.FC<Props> = ({
  items,
  currentItem,
  selectItem = () => {},
  openItem = () => {}
}) => (
  <StyledFileItemList>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th className="header_right">Size</th>
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
                ? 'list_item_select'
                : 'list_item'
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
            <td className="value_type">{item.type}</td>
            <td className="value_size">{item.size}</td>
            <td className="value_permission">{item.permission}</td>
            <td className="value_modified">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </StyledFileItemList>
)
