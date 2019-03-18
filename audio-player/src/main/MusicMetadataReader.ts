import Path from 'path'
import Fs from 'fs'
import Crypto from 'crypto'
import * as mm from 'music-metadata'
import { IAudioMetadata, IPicture } from 'music-metadata/lib/type'
import { MusicMetadata } from '../common/Types'

let imageSaveDirPath: string = ''

/**
 * Get the SHA-1 hash from binary data.
 * @param data Ninary data.
 * @returns Hash string.
 */
const hash = (data: Buffer) => {
  const sha = Crypto.createHash('sha1')
  sha.update(data)
  return sha.digest('hex')
}

/**
 * Save the image data as a file.
 * @param pictures Collection of the picrure.
 * @returns Path of saved image file on success. Otherwise it is the empty string.
 */
const saveImageFile = (pictures: IPicture[] | undefined): string => {
  if (!(pictures && 0 < pictures.length)) {
    return ''
  }

  try {
    const picture = pictures[0]
    const extention = picture.format.replace('image/', '')
    const fileName = `${hash(picture.data)}.${extention}`
    const filePath = Path.resolve(imageSaveDirPath, fileName)
    if (Fs.existsSync(filePath)) {
      return filePath
    }

    Fs.writeFileSync(filePath, picture.data)
    return filePath
  } catch (err) {
    /// #if env == 'DEBUG'
    console.error(err)
    /// #endif

    return ''
  }
}

/**
 * Set a path of an image save destination direcgtory.
 * @param dirPath Path of an image save destination direcgtory.
 */
export const SetImageSaveDir = (dirPath: string) => {
  if (dirPath && !Fs.existsSync(dirPath)) {
    Fs.mkdirSync(dirPath)
  }

  if (Fs.existsSync(dirPath)) {
    imageSaveDirPath = dirPath
  }
}

/**
 * Read the metadata from music file.
 * @param filePath Path of the music file.
 * @returns Asynchronous task.
 */
export const ReadMusicMetadata = (filePath: string): Promise<MusicMetadata> => {
  return new Promise((resolve, reject) => {
    return mm
      .parseFile(filePath, { duration: true })
      .then((metadata: IAudioMetadata) => {
        const imageFilePath = saveImageFile(metadata.common.picture)
        const common = metadata.common
        resolve({
          filePath,
          artist: common.artist || '',
          album: common.album || '',
          title: common.title || '',
          year: common.year ? String(common.year) : '',
          track: common.track && 0 < common.track.no ? common.track.no : 1,
          disc: common.disk && 0 < common.disk.no ? common.disk.no : 1,
          genre: common.genre && 0 < common.genre.length ? common.genre[0] : '',
          duration: metadata.format.duration || 0,
          imageFilePath
        })
      })
      .catch((error) => reject(error))
  })
}
