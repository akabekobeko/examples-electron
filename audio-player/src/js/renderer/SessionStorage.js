import WebStorage from './WebStorage.js'

/**
 * Provides a sessionStorage (Web Storage) of operating functions.
 */
export default class SessionStorage extends WebStorage {
  /**
   * Initialize instance.
   */
  constructor () {
    // Becomes the stub when it is run on the Node
    const storage = (typeof window === 'object' ? window.sessionStorage : {})
    super(storage)
  }
}
