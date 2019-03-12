import { MusicMetadata } from '../../../common/Types'
import Music from './Music'

/** Name of database. */
const DatabaseName = 'music_db'

/** Version of database. */
const DatabaseVersion = 1

/** Store name of database */
const DatabaseStoreName = 'musics'

/**
 * Manage for the music database.
 */
class MusicDatabase {
  /** Database connection */
  private _db: IDBDatabase | null = null

  /**
   * Load the music from database.
   * @returns Asynchronous task.
   */
  load(): Promise<Music[]> {
    return new Promise((resolve, reject) => {
      this.open().then((db) => {
        this._db = db
        const transaction = this._db.transaction(DatabaseName, 'readonly')
        const store = transaction.objectStore(DatabaseStoreName)
        const request = store.openCursor()
        const musics: Music[] = []

        request.onsuccess = (ev) => {
          const cursor = (<IDBRequest>ev.target).result as IDBCursorWithValue
          if (cursor) {
            musics.push(cursor.value as Music)
            cursor.continue()
          } else {
            resolve(musics)
          }
        }

        request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
      })
    })
  }

  /**
   * Clear all data in the database.
   * @returns Asynchronous task.
   */
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        return reject(new Error('Not connected to the database.'))
      }

      const transaction = this._db.transaction(DatabaseName, 'readwrite')
      const store = transaction.objectStore(DatabaseStoreName)
      const request = store.clear()
      request.onsuccess = () => resolve()
      request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
    })
  }

  /**
   * Dipose the database.
   * @returns Asynchronous task.
   */
  dispose(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._db) {
        this._db.close()
        this._db = null
      }

      const request = window.indexedDB.deleteDatabase(DatabaseName)
      request.onsuccess = () => resolve()
      request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
    })
  }

  /**
   * Add a music to database.
   * @param metadata Metadata of the music.
   * @returns Asynchronous task.
   */
  add(metadata: MusicMetadata): Promise<Music> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        return reject(new Error('Not connected to the database.'))
      }

      const transaction = this._db.transaction(DatabaseName, 'readwrite')
      const store = transaction.objectStore(DatabaseStoreName)
      const request = store.put(metadata)

      request.onsuccess = (ev) => {
        const id = (<IDBRequest>ev.target).result as number
        resolve(new Music(id, metadata))
      }

      request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
    })
  }

  /**
   * Remove the music from database.
   * @param id Identifier of the music.
   * @returns Asynchronous task.
   */
  remove(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        return reject(new Error('Not connected to the database.'))
      }

      const transaction = this._db.transaction(DatabaseName, 'readwrite')
      const store = transaction.objectStore(DatabaseStoreName)
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve(id)
      }

      request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
    })
  }

  /**
   * Open the database.
   * @returns Asynchronous task.
   */
  private open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DatabaseName, DatabaseVersion)

      request.onupgradeneeded = (ev) => {
        const db = (<IDBRequest>ev.target).result as IDBDatabase
        if (!db) {
          return reject(new Error('Database connection failed'))
        }

        const store = db.createObjectStore(DatabaseStoreName, {
          keyPath: 'id',
          autoIncrement: true
        })

        store.createIndex('path', 'path', { unique: true })
        store.transaction.oncomplete = () => {
          resolve(db)
        }
      }

      request.onsuccess = (ev) => {
        const db = (<IDBRequest>ev.target).result as IDBDatabase
        if (!db) {
          return reject(new Error('Database connection failed'))
        }

        resolve(db)
      }

      request.onerror = (ev) => reject((<IDBRequest>ev.target).error)
    })
  }
}

export default MusicDatabase
