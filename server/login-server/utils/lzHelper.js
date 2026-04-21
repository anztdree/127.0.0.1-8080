/**
 * Login Server — LZ-String Compression Helper
 *
 * Client uses LZString.decompressFromUTF16() when compress=true
 * Server must use compressToUTF16() to match.
 */

var LZString = require('lz-string');

module.exports = {
    /**
     * Compress string to UTF16 format (client-compatible)
     * @param {string} str
     * @returns {string} Compressed string
     */
    compress: function (str) {
        return LZString.compressToUTF16(str);
    },

    /**
     * Decompress UTF16 format string
     * @param {string} compressed
     * @returns {string} Original string
     */
    decompress: function (compressed) {
        return LZString.decompressFromUTF16(compressed);
    },
};
