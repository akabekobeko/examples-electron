import Util from '../../common/Util.js'

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
   * @param {String}  key           Key of value.
   * @param {Boolean} withParseJSON Parse the obtained value if "true" as JSON. Default is "false".
   *
   * @return {Object} Successful if the loaded value. Otherwise "null".
   */
  getItem (key, withParseJSON) {
    if (!(this._storage)) {
      return null
    }

    const item   = this._storage.getItem(key)

    try {
      const result = (item ? (withParseJSON ? JSON.parse(item) : item) : null)
      return result
    } catch (err) {
      Util.error(err)
      return null
    }
  }

  /**
   * Set the value to storage by key.
   *
   * @param {String}  key           Key of value.
   * @param {Object}  value         The value to be set.
   * @param {Boolean} withStringify Set the converts the "true" if the value in the JSON string.
   *
   * @return {Boolean} Successful if "true".
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
   * @param {String} key Key of value.
   *
   * @return {Boolean} Successful if "true".
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
   * @return {Boolean} Successful if "true".
   */
  clear () {
    if (!(this._storage)) {
      return false
    }

    this._storage.clear()
    return true
  }
}
