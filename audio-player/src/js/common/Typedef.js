/**
 * @typedef {Object} Fraction
 * @property {Number} no Numerator.
 * @property {Number} of Denominator.
 */

/**
 * @typedef {Object} Picture
 * @property {String} format Format of an image file ( "jpg" or "png" ).
 * @property {Buffer} data   Image data.
 */

/**
 * @typedef {Object} MusicMetadata
 * @property {Array.<String>} artist      Artist names.
 * @property {String}         album       Album name.
 * @property {Array.<String>} albumartist Artist names of the album.
 * @property {String}         title       Title.
 * @property {String}         year        Release year. MP4v2 is a "YYYY-MM-DD".
 * @property {Fraction}       track       Track number of a disc.
 * @property {Fraction}       disk        Disc number of a multiple discs.
 * @property {Array.<String>} genre       Genre names.
 * @property {Picture}        picture     Image data.
 * @property {Number}         duration    Duration ( Seconds ).
 */
