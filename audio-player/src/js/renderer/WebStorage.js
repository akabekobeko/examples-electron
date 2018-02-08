/**
 * Provides a Web Storage of operating functions.
 */
export default class WebStorage {
  /**
   * Initialize instance.
   *
   * @param {localStorage|sessionStorage} storage Instance of local or session storage.
   */
  constructor (storage) {
    /**
     * Instance of local or session storage.
     * @type {localStorage|sessionStorage}
     */
    this._storage = storage
  }

  /**
   * Get the value from storage by key.
   *
   * @param {string} key Key of value.
   * @param {boolean} withParseJSON Parse the obtained value if "true" as JSON. Default is "false".
   *
   * @return {object} Successful if the loaded value. Otherwise "null".
   */
  getItem (key, withParseJSON) {
    if (!(this._storage)) {
      return null
    }

    try {
      const item = this._storage.getItem(key)
      const result = (item ? (withParseJSON ? JSON.parse(item) : item) : null)
      return result
    } catch (err) {
      console.error(err)
      return null
    }
  }

  /**
   * Set the value to storage by key.
   *
   * @param {string} key Key of value.
   * @param {object} value The value to be set.
   * @param {boolean} withStringify Set the converts the "true" if the value in the JSON string.
   *
   * @return {boolean} Successful if "true".
   */
  setItem (key, value, withStringify) {
    if (!(this._storage)) {
      return false
    }

    this._storage.setItem(key, withStringify ? JSON.stringify(value) : value)
    return true
  }

  /**
   * Remove the value to storage by key.
   *
   * @param {string} key Key of value.
   *
   * @return {boolean} Successful if "true".
   */
  removeItem (key) {
    if (!(this._storage)) {
      return false
    }

    this._storage.removeItem(key)
    return true
  }

  /**
   * Empty all keys out of the storage.
   *
   * @return {boolean} Successful if "true".
   */
  clear () {
    if (!(this._storage)) {
      return false
    }

    this._storage.clear()
    return true
  }
}
