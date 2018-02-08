import WebStorage from './WebStorage.js'

/**
 * Provides a localStorage (Web Storage) of operating functions.
 */
export default class LocalStorage extends WebStorage {
  /**
   * Initialize instance.
   */
  constructor () {
    // Becomes the stub when it is run on the Node
    const storage = (typeof window === 'object' ? window.localStorage : {})
    super(storage)
  }
}
