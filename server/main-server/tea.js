/**
 * tea.js — XXTEA Encryption Module
 *
 * ALGORITMA: XXTEA (Corrected Block TEA)
 * BUKAN TEA standar — client memakai XXTEA!
 *
 * Perbedaan kritis vs TEA standar:
 * ┌──────────────────┬───────────────────────────┬───────────────────┐
 * │ Aspek            │ Client (XXTEA)            │ Lama (TEA standar)│
 * ├──────────────────┼───────────────────────────┼───────────────────┤
 * │ Algoritma        │ XXTEA (entire array)      │ TEA (64-bit block)│
 * │ Rounds           │ Math.floor(6 + 52 / n)    │ 16 (fixed)        │
 * │ Byte order       │ Little-endian             │ Big-endian        │
 * │ Output           │ Base64                    │ Raw string        │
 * │ Block processing │ Seluruh array sekaligus   │ Per 2-block pair  │
 * └──────────────────┴───────────────────────────┴───────────────────┘
 *
 * Source: main.min(unminfy).js Line 117041 (TEA class)
 * Handshake flow: Line 82579-82587 (socketOnVerify)
 *
 * Protokol handshake:
 * 1. Server emit 'verify' dengan nonce string (16 alphanumeric chars)
 * 2. Client encrypt nonce: new TEA().encrypt(nonce, 'verification')
 * 3. Client emit 'verify' dengan encrypted nonce (Base64 string)
 * 4. Server decrypt dan compare — cocok → {ret:0}, tidak → {ret:1}
 */

const logger = require('./logger');

// ─── XXTEA Key ───
// String literal dari main.min(unminfy).js Line 82582
const TEA_KEY = 'verification';

// ─── XXTEA Delta ───
// Golden ratio constant — sama di TEA/XTEA/XXTEA
const DELTA = 0x9E3779B9;

// ═══════════════════════════════════════════════════════════════
// UTF-8 ENCODE / DECODE
// Port persis dari main.min(unminfy).js Utf8 class
// ═══════════════════════════════════════════════════════════════

const Utf8 = {
    /**
     * Encode string ke UTF-8 binary string
     * Setiap multi-byte char dipecah jadi sequence 2-3 byte
     * @param {string} str - Input string
     * @returns {string} UTF-8 encoded binary string
     */
    encode: function (str) {
        // 2-byte UTF-8: U+0080..U+07FF → 110xxxxx 10xxxxxx
        var t = str.replace(/[\u0080-\u07ff]/g, function (e) {
            var t = e.charCodeAt(0);
            return String.fromCharCode(192 | t >> 6, 128 | 63 & t);
        });
        // 3-byte UTF-8: U+0800..U+FFFF → 1110xxxx 10xxxxxx 10xxxxxx
        return t = t.replace(/[\u0800-\uffff]/g, function (e) {
            var t = e.charCodeAt(0);
            return String.fromCharCode(224 | t >> 12, 128 | t >> 6 & 63, 128 | 63 & t);
        });
    },

    /**
     * Decode UTF-8 binary string ke string normal
     * @param {string} str - UTF-8 encoded binary string
     * @returns {string} Decoded string
     */
    decode: function (str) {
        // 3-byte UTF-8 → single char
        var t = str.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (e) {
            var t = (15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2);
            return String.fromCharCode(t);
        });
        // 2-byte UTF-8 → single char
        return t = t.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (e) {
            var t = (31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1);
            return String.fromCharCode(t);
        });
    }
};

// ═══════════════════════════════════════════════════════════════
// LITTLE-ENDIAN: String ↔ Uint32 Array
// Port persis dari main.min(unminfy).js TEA class Line 117041
//
// Client memakai LITTLE-ENDIAN:
//   t[n] = charCodeAt(4*n) + (charCodeAt(4*n+1) << 8)
//        + (charCodeAt(4*n+2) << 16) + (charCodeAt(4*n+3) << 24)
// ═══════════════════════════════════════════════════════════════

/**
 * Convert binary string ke array of uint32 (Little-endian)
 * @param {string} str - Binary string (setiap char 0-255)
 * @returns {number[]} Array of uint32 values
 */
function strToLongs(str) {
    for (var t = new Array(Math.ceil(str.length / 4)), n = 0; n < t.length; n++) {
        t[n] = str.charCodeAt(4 * n)
            + (str.charCodeAt(4 * n + 1) << 8)
            + (str.charCodeAt(4 * n + 2) << 16)
            + (str.charCodeAt(4 * n + 3) << 24);
    }
    return t;
}

/**
 * Convert array of uint32 ke binary string (Little-endian)
 * @param {number[]} ints - Array of uint32 values
 * @returns {string} Binary string (setiap char 0-255)
 */
function longsToStr(ints) {
    for (var t = new Array(ints.length), n = 0; n < ints.length; n++) {
        t[n] = String.fromCharCode(
            255 & ints[n],
            ints[n] >>> 8 & 255,
            ints[n] >>> 16 & 255,
            ints[n] >>> 24 & 255
        );
    }
    return t.join('');
}

// ═══════════════════════════════════════════════════════════════
// XXTEA ENCRYPT / DECRYPT
// Port persis dari main.min(unminfy).js Line 117041 TEA class
//
// Signature XXTEA (bukan TEA standar):
// - Variable rounds: Math.floor(6 + 52 / n) — n = jumlah blocks
// - Entire array processed together (bukan per 2-block pair)
// - MX mixing function: (s>>>5 ^ l<<2) + (l>>>3 ^ s<<4) ^ (p^l) + (r[3&d^a]^s)
//
// Key preparation:
// 'verification' → Utf8.encode → .slice(0,16) → strToLongs
// Menghasilkan 3 uint32 (12 bytes / 4 = 3)
// r[3] = undefined → dalam bitwise XOR, undefined → 0
// Efektif: key[3] = 0 (padding null byte)
// ═══════════════════════════════════════════════════════════════

/**
 * XXTEA Encrypt
 * Port persis dari main.min(unminfy).js TEA.prototype.encrypt
 *
 * @param {string} plaintext - String untuk di-encrypt
 * @param {string} key - Key string (default: TEA_KEY)
 * @returns {string} Base64 encoded ciphertext
 */
function encrypt(plaintext, key) {
    key = key || TEA_KEY;

    if (0 == plaintext.length) {
        return '';
    }

    // Plaintext → UTF-8 → uint32 array (Little-endian)
    var n = strToLongs(Utf8.encode(plaintext));

    // Minimum 2 blocks (XXTEA requirement)
    n.length <= 1 && (n[1] = 0);

    // Key → UTF-8 → slice(0,16) → uint32 array (Little-endian)
    var r = strToLongs(Utf8.encode(key).slice(0, 16));

    var i = n.length;     // jumlah blocks
    var s = n[i - 1];     // prev = last block
    var l = n[0];         // next = first block
    var c = Math.floor(6 + 52 / i);  // XXTEA variable rounds
    var p = 0;            // sum = 0

    // XXTEA encrypt rounds
    while (c-- > 0) {
        p += DELTA;
        var a = p >>> 2 & 3;
        for (var d = 0; i > d; d++) {
            l = n[(d + 1) % i];
            // MX mixing function — persis dari client
            var o = (s >>> 5 ^ l << 2) + (l >>> 3 ^ s << 4) ^ (p ^ l) + (r[3 & d ^ a] ^ s);
            s = n[d] += o;
        }
    }

    // uint32 array → binary string → Base64
    var g = longsToStr(n);
    return Buffer.from(g, 'binary').toString('base64');
}

/**
 * XXTEA Decrypt
 * Port persis dari main.min(unminfy).js TEA.prototype.decrypt
 *
 * @param {string} ciphertext - Base64 encoded ciphertext
 * @param {string} key - Key string (default: TEA_KEY)
 * @returns {string} Decrypted plaintext string
 */
function decrypt(ciphertext, key) {
    key = key || TEA_KEY;

    if (0 == ciphertext.length) {
        return '';
    }

    // Base64 → binary string → uint32 array (Little-endian)
    var a = strToLongs(Buffer.from(ciphertext, 'base64').toString('binary'));

    // Key → UTF-8 → slice(0,16) → uint32 array (Little-endian)
    var r = strToLongs(Utf8.encode(key).slice(0, 16));

    var i = a.length;     // jumlah blocks
    var s = a[i - 1];     // prev = last block
    var l = a[0];         // next = first block
    var c = Math.floor(6 + 52 / i);  // XXTEA variable rounds
    var p = c * DELTA;    // sum = rounds * delta (start dari akhir)

    // XXTEA decrypt rounds (reverse order)
    while (0 != p) {
        var o = p >>> 2 & 3;
        for (var d = i - 1; d >= 0; d--) {
            s = a[d > 0 ? d - 1 : i - 1];
            // MX mixing function — persis dari client
            var n = (s >>> 5 ^ l << 2) + (l >>> 3 ^ s << 4) ^ (p ^ l) + (r[3 & d ^ o] ^ s);
            l = a[d] -= n;
        }
        p -= DELTA;
    }

    // uint32 array → binary string → trim null padding → UTF-8 decode
    var g = longsToStr(a);
    g = g.replace(/\0+$/, '');
    return Utf8.decode(g);
}

// ═══════════════════════════════════════════════════════════════
// HANDSHAKE FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Generate random nonce untuk TEA handshake
 * 16 karakter alphanumeric — persis seperti client expect
 * @returns {string} Random nonce string (16 chars)
 */
function generateNonce() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < 16; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
}

/**
 * Verify TEA handshake — decrypt client response dan compare dengan original nonce
 *
 * Flow (dari main.min(unminfy).js Line 82579-82587):
 * 1. Server emit('verify', nonce)
 * 2. Client: new TEA().encrypt(nonce, 'verification') → Base64 string
 * 3. Client emit('verify', encryptedNonce, callback)
 * 4. Server decrypt → compare dengan nonce asli
 *
 * @param {string} clientResponse - Base64 encrypted nonce dari client
 * @param {string} originalNonce - Original nonce yang dikirim server
 * @returns {boolean} true jika handshake valid
 */
function verifyHandshake(clientResponse, originalNonce) {
    try {
        const decrypted = decrypt(clientResponse, TEA_KEY);
        const match = decrypted === originalNonce;

        if (!match) {
            logger.log('WARN', 'TEA', 'TEA handshake verification failed');
            logger.details('important',
                ['expected', originalNonce.substring(0, 8) + '...'],
                ['decrypted', decrypted.substring(0, 8) + '...']
            );
        }

        return match;
    } catch (err) {
        logger.log('ERROR', 'TEA', 'TEA decrypt error');
        logger.detail('important', ['error', err.message]);
        return false;
    }
}

module.exports = {
    encrypt,
    decrypt,
    generateNonce,
    verifyHandshake,
    TEA_KEY
};
