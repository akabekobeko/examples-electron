/**
 * It represents the number of minutes.
 *
 * @typedef {object} Fraction
 * @property {number} no Numerator.
 * @property {number} of Denominator.
 */

/**
 * Picture data in muisc metadata.
 *
 * @typedef {object} Picture
 * @property {string} format Format of an image file ( "jpg" or "png" ).
 * @property {Buffer} data Image data.
 */

/**
 * Metadata of a music file.
 *
 * @see https://github.com/leetreveil/musicmetadata
 *
 * @typedef {object} MusicMetadata
 * @property {string[]} artist Artist names.
 * @property {string} album Album name.
 * @property {string[]} albumartist Artist names of the album.
 * @property {string} title Title.
 * @property {string} year Release year. MP4v2 is a "YYYY-MM-DD".
 * @property {Fraction} track Track number of a disc.
 * @property {Fraction} disk Disc number of a multiple discs.
 * @property {string[]} genre Genre names.
 * @property {Picture} picture Image data.
 * @property {number} duration Duration ( Seconds ).
 */

/**
 * Preset of a graphic equalizer.
 *
 * @typedef {object} GraphicEqualizerPreset
 * @property {String} name Preset name.
 * @property {number[]} gains Prest gains.
 */

/**
 * @external {EventEmitter} https://github.com/atom/electron/blob/master/docs/api/web-contents.md
 */

/**
 * @external {ipcMain} https://github.com/atom/electron/blob/master/docs/api/ipc-main.md
 */

/**
 * @external {ipcRenderer} https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md
 */

/**
 * @external {IPCEvent} https://github.com/atom/electron/blob/master/docs/api/ipc-main.md
 */

/**
 * @external {EventEmitter} https://nodejs.org/api/events.html
 */

/**
 * @external {Buffer} https://nodejs.org/api/buffer.html
 */
