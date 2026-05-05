/**
 * tea.js — XXTEA Encryption/Decryption
 *
 * Algoritma: XXTEA (Corrected Block TEA)
 * Key: 'verification' (12 karakter)
 * Sumber: main.min(unminfy).js Line 117041
 *
 * Flow:
 *   1. Server generate nonce → emit 'verify' ke client
 *   2. Client encrypt nonce dengan XXTEA → emit 'verify' ke server
 *   3. Server decrypt → cocokkan dengan nonce asli
 *   4. Cocok → callback({ret:0}), Tidak → callback({ret:55})
 */

const crypto = require('crypto');

const DELTA = 0x9E3779B9;

/**
 * Convert string to Uint32Array (little-endian)
 */
function stringToUint32Array(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code <= 0x7F) {
            bytes.push(code);
        } else if (code <= 0x7FF) {
            bytes.push(0xC0 | (code >> 6));
            bytes.push(0x80 | (code & 0x3F));
        } else {
            bytes.push(0xE0 | (code >> 12));
            bytes.push(0x80 | ((code >> 6) & 0x3F));
            bytes.push(0x80 | (code & 0x3F));
        }
    }
    // Pad to multiple of 4
    while (bytes.length % 4 !== 0) {
        bytes.push(0);
    }
    const result = new Uint32Array(bytes.length / 4);
    for (let i = 0; i < bytes.length; i += 4) {
        result[i / 4] = bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);
    }
    return result;
}

/**
 * Convert Uint32Array to string (little-endian)
 */
function uint32ArrayToString(arr) {
    const bytes = [];
    for (let i = 0; i < arr.length; i++) {
        bytes.push(arr[i] & 0xFF);
        bytes.push((arr[i] >>> 8) & 0xFF);
        bytes.push((arr[i] >>> 16) & 0xFF);
        bytes.push((arr[i] >>> 24) & 0xFF);
    }
    // Remove trailing zeros
    while (bytes.length > 0 && bytes[bytes.length - 1] === 0) {
        bytes.pop();
    }
    let result = '';
    let i = 0;
    while (i < bytes.length) {
        const b1 = bytes[i++];
        if (b1 <= 0x7F) {
            result += String.fromCharCode(b1);
        } else if (b1 <= 0xDF && i < bytes.length) {
            const b2 = bytes[i++];
            result += String.fromCharCode(((b1 & 0x1F) << 6) | (b2 & 0x3F));
        } else if (i + 1 < bytes.length) {
            const b2 = bytes[i++];
            const b3 = bytes[i++];
            result += String.fromCharCode(((b1 & 0x0F) << 12) | ((b2 & 0x3F) << 6) | (b3 & 0x3F));
        }
    }
    return result;
}

/**
 * XXTEA Encrypt — mengikuti algoritma dari main.min.js Line 117041
 * @param {string} plaintext - String yang akan di-encrypt
 * @param {string} keyString - Key ('verification')
 * @returns {string} Base64 encoded encrypted string
 */
function encrypt(plaintext, keyString) {
    const v = stringToUint32Array(plaintext);
    if (v.length < 2) {
        // Pad to at least 2 blocks
        const padded = new Uint32Array(2);
        padded.set(v);
        return encryptUint32Array(padded, keyString);
    }
    return encryptUint32Array(v, keyString);
}

function encryptUint32Array(v, keyString) {
    const k = stringToUint32Array(keyString);
    // Ensure key has exactly 4 elements
    const key = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
        key[i] = i < k.length ? k[i] : 0;
    }

    const n = v.length;
    const rounds = Math.floor(6 + 52 / n);
    let sum = 0;

    for (let r = 0; r < rounds; r++) {
        sum = (sum + DELTA) >>> 0;
        const a = (sum >>> 2) & 3;

        for (let d = 0; d < n; d++) {
            const next = v[(d + 1) % n];
            const prev = d > 0 ? v[d - 1] : v[n - 1];

            const mix = (
                (((prev >>> 5) ^ (next << 2)) + ((next >>> 3) ^ (prev << 4))) ^
                (((sum ^ next) + (key[(3 & d) ^ a] ^ prev)))
            ) >>> 0;

            v[d] = (v[d] + mix) >>> 0;
        }
    }

    // Convert to Base64
    const bytes = [];
    for (let i = 0; i < v.length; i++) {
        bytes.push(v[i] & 0xFF);
        bytes.push((v[i] >>> 8) & 0xFF);
        bytes.push((v[i] >>> 16) & 0xFF);
        bytes.push((v[i] >>> 24) & 0xFF);
    }

    return Buffer.from(bytes).toString('base64');
}

/**
 * XXTEA Decrypt
 * @param {string} ciphertext - Base64 encoded encrypted string
 * @param {string} keyString - Key ('verification')
 * @returns {string} Decrypted plaintext
 */
function decrypt(ciphertext, keyString) {
    // Decode Base64 to Uint32Array
    const bytes = Buffer.from(ciphertext, 'base64');
    const v = new Uint32Array(bytes.length / 4);
    for (let i = 0; i < bytes.length; i += 4) {
        v[i / 4] = bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);
    }

    const k = stringToUint32Array(keyString);
    const key = new Uint32Array(4);
    for (let i = 0; i < 4; i++) {
        key[i] = i < k.length ? k[i] : 0;
    }

    const n = v.length;
    const rounds = Math.floor(6 + 52 / n);

    let sum = (DELTA * rounds) >>> 0;

    for (let r = 0; r < rounds; r++) {
        const a = (sum >>> 2) & 3;

        for (let d = n - 1; d >= 0; d--) {
            const next = v[(d + 1) % n];
            const prev = d > 0 ? v[d - 1] : v[n - 1];

            const mix = (
                (((prev >>> 5) ^ (next << 2)) + ((next >>> 3) ^ (prev << 4))) ^
                (((sum ^ next) + (key[(3 & d) ^ a] ^ prev)))
            ) >>> 0;

            v[d] = (v[d] - mix) >>> 0;
        }

        sum = (sum - DELTA) >>> 0;
    }

    return uint32ArrayToString(v);
}

/**
 * Generate random nonce for TEA handshake
 * @returns {string} 32-character hex string
 */
function generateNonce() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Verify TEA handshake
 * @param {string} nonce - Original nonce sent to client
 * @param {string} encrypted - Encrypted nonce from client
 * @param {string} key - TEA key ('verification')
 * @returns {boolean} True if decryption matches nonce
 */
function verify(nonce, encrypted, key) {
    try {
        const decrypted = decrypt(encrypted, key || 'verification');
        return decrypted === nonce;
    } catch (e) {
        return false;
    }
}

module.exports = {
    encrypt,
    decrypt,
    generateNonce,
    verify
};
