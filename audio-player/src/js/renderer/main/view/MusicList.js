import React from 'react'
import PropTypes from 'prop-types'
import Item from './MusicListItem.js'
import Styles from './MusicList.scss'

/**
 * Component of the music list.
 *
 * @param {object} props Properties.
 * @param {Music[]} props.musics Collection of music.
 * @param {Music} props.selectedMusic Selected music.
 * @param {Music} props.playingMusic Playing music.
 * @param {function} props.onSelect Called when the music is selected.
 * @param {function} props.onPlay Called when the music is played or paused.
 */
const MusicList = ({musics, selectedMusic, playingMusic, onSelect, onPlay}) => {
  // Group by disc number
  const discs = {}
  musics.forEach((music) => {
    if (discs[music.disc] === undefined) {
      discs[music.disc] = []
    }

    discs[music.disc].push(music)
  })

  const discNumbers = Object.keys(discs)
  if (1 < discNumbers.length) {
    return (
      <div className={Styles.list}>
        {discNumbers.map((disc) => {
          return (
            <React.Fragment>
              <div key={disc} className={Styles.disc}>Disc {disc}</div>
              {musics.map((music) => {
                return (
                  <Item
                    music={music}
                    selected={music === selectedMusic}
                    playing={music === playingMusic}
                    onSelect={onSelect}
                    onPlay={onPlay}
                  />
                )
              })}
            </React.Fragment>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className={Styles.list}>
        {musics.map((music, index) => {
          return (
            <Item
              key={index}
              index={index}
              music={music}
              selected={music === selectedMusic}
              playing={music === playingMusic}
              onSelect={onSelect}
              onPlay={onPlay}
            />
          )
        })}
      </div>
    )
  }
}

MusicList.propTypes = {
  musics: PropTypes.array,
  selectedMusic: PropTypes.object,
  playingMusic: PropTypes.object,
  onSelect: PropTypes.func,
  onPlay: PropTypes.func
}

export default MusicList
