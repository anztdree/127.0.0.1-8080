/**
 * LZString Compression Helper
 * 
 * Wraps lz-string library for use by responseHelper.
 * Client uses LZString.decompressFromUTF16 to decompress data
 * (main.min.js line 76926-76929):
 *   var i = e.data;
 *   e.compress && (i = LZString.decompressFromUTF16(i));
 *   var a = JSON.parse(i);
 * 
 * Server compresses with LZString.compressToUTF16 before sending.
 * This is OPTIONAL — most responses don't use compression.
 */

const LZString = require('lz-string');

/**
 * Compress a string using LZString UTF-16 encoding.
 * Matches client's LZString.decompressFromUTF16() on the receiving end.
 * 
 * @param {string} dataStr - JSON string to compress
 * @returns {string} Compressed string
 */
function compressData(dataStr) {
    if (!dataStr) return '';
    return LZString.compressToUTF16(dataStr);
}

/**
 * Decompress a string that was compressed with compressToUTF16.
 * Used when the server needs to read compressed data (rare).
 * 
 * @param {string} compressedStr - Compressed string
 * @returns {string} Original decompressed string
 */
function decompressData(compressedStr) {
    if (!compressedStr) return '';
    return LZString.decompressFromUTF16(compressedStr);
}

module.exports = {
    compressData: compressData,
    decompressData: decompressData,
};
