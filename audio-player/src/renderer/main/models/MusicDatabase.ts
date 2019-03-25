import { MusicMetadata } from '../../../common/Types'
import Music from './Music'

/** Name of database. */
const DatabaseName = 'music_db'

/** Version of database. */
const DatabaseVersion = 1

/** Store name of database */
const DatabaseStoreName = 'musics'

/**
 * Open the database.
 * @returns Asynchronous task.
 */
export const open = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DatabaseName, DatabaseVersion)

    request.onupgradeneeded = () => {
      const db = request.result
      const store = db.createObjectStore(DatabaseStoreName, {
        keyPath: 'id',
        autoIncrement: true
      })

      store.createIndex('filePath', 'filePath', { unique: true })
      store.transaction.oncomplete = () => resolve(db)
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Load the music from database.
 * @param db Database connection.
 * @returns Asynchronous task.
 */
export const load = (db: IDBDatabase): Promise<Music[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DatabaseStoreName, 'readonly')
    const store = transaction.objectStore(DatabaseStoreName)
    const request = store.openCursor()
    const musics: Music[] = []

    request.onsuccess = () => {
      const cursor = request.result
      if (cursor) {
        musics.push(cursor.value as Music)
        cursor.continue()
      } else {
        resolve(musics)
      }
    }

    request.onerror = () => reject(request.error)
  })
}

/**
 * Add a music to database.
 * @param db Database connection.
 * @param metadata Metadata of the music.
 * @returns Asynchronous task.
 */
export const add = (
  db: IDBDatabase,
  metadata: MusicMetadata
): Promise<Music> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DatabaseStoreName, 'readwrite')
    const store = transaction.objectStore(DatabaseStoreName)
    const request = store.put(metadata)

    request.onsuccess = () => {
      const id = request.result as number
      resolve(new Music(id, metadata))
    }

    request.onerror = () => reject(request.error)
  })
}

/**
 * Remove the music from database.
 * @param db Database connection.
 * @param id Identifier of the music.
 * @returns Asynchronous task.
 */
export const remove = (db: IDBDatabase, id: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DatabaseStoreName, 'readwrite')
    const store = transaction.objectStore(DatabaseStoreName)
    const request = store.delete(id)

    request.onsuccess = () => resolve(id)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Clear all data in the database.
 * @param db Database connection.
 * @returns Asynchronous task.
 */
export const clear = (db: IDBDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DatabaseStoreName, 'readwrite')
    const store = transaction.objectStore(DatabaseStoreName)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * Dipose the database.
 * @returns Asynchronous task.
 */
export const dispose = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(DatabaseName)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
