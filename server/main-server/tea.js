/**
 * tea.js — XXTEA Encryption/Decryption
 * Referensi: game.md §5 — L117041-117091
 *
 * Algorithm: Corrected Block TEA (XXTEA)
 * Key: 'verification' (UTF-8, truncated to 16 bytes)
 * Delta: 2654435769 (0x9E3779B9) — Golden ratio
 * Rounds: Math.floor(6 + 52/blockCount)
 * Min blocks: 2 (pad if < 2)
 * Output: Base64 encoded (encrypt), Base64 input (decrypt)
 * Endianness: Little-endian (strToLongs / longsToStr)
 * Null strip: replace(/\0+$/, '') on decrypt output
 */

const DELTA = 2654435769; // 0x9E3779B9

// ─── UTF-8 Encode/Decode ───

function utf8Encode(str) {
    return unescape(encodeURIComponent(str));
}

function utf8Decode(str) {
    return decodeURIComponent(escape(str));
}

// ─── Little-endian conversions ───

function strToLongs(s) {
    const longs = [];
    for (let i = 0; i < s.length; i += 4) {
        longs.push(
            (s.charCodeAt(i) & 0xFF) |
            ((s.charCodeAt(i + 1) & 0xFF) << 8) |
            ((s.charCodeAt(i + 2) & 0xFF) << 16) |
            ((s.charCodeAt(i + 3) & 0xFF) << 24)
        );
    }
    return longs;
}

function longsToStr(l) {
    let s = '';
    for (let i = 0; i < l.length; i++) {
        s += String.fromCharCode(
            l[i] & 0xFF,
            (l[i] >>> 8) & 0xFF,
            (l[i] >>> 16) & 0xFF,
            (l[i] >>> 24) & 0xFF
        );
    }
    return s;
}

// ─── Base64 ───

function base64Encode(str) {
    return Buffer.from(str, 'binary').toString('base64');
}

function base64Decode(str) {
    return Buffer.from(str, 'base64').toString('binary');
}

// ─── XXTEA Core ───

function encrypt(plaintext, key) {
    if (!plaintext || plaintext.length === 0) return '';

    const n = strToLongs(utf8Encode(plaintext));
    if (n.length <= 1) n[1] = 0; // Min 2 blocks

    const k = strToLongs(utf8Encode(key).slice(0, 16)); // Key max 16 bytes
    const len = n.length;
    let z = n[len - 1], y = n[0];
    let rounds = Math.floor(6 + 52 / len);
    let sum = 0;

    while (rounds-- > 0) {
        sum = (sum + DELTA) >>> 0; // Keep unsigned 32-bit
        const e = (sum >>> 2) & 3;
        for (let p = 0; p < len; p++) {
            y = n[(p + 1) % len];
            const mx = (((z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)) ^ ((sum ^ y) + (k[(3 & p) ^ e] ^ z))) >>> 0;
            z = n[p] = (n[p] + mx) >>> 0;
        }
    }

    return base64Encode(longsToStr(n));
}

function decrypt(ciphertext, key) {
    if (!ciphertext || ciphertext.length === 0) return '';

    const n = strToLongs(base64Decode(ciphertext));
    const k = strToLongs(utf8Encode(key).slice(0, 16));
    const len = n.length;
    let rounds = Math.floor(6 + 52 / len);
    let sum = (rounds * DELTA) >>> 0;

    while (rounds-- > 0) {
        const e = (sum >>> 2) & 3;
        for (let p = len - 1; p >= 0; p--) {
            const z = n[(p - 1 + len) % len];
            const y = n[(p + 1) % len];
            const mx = (((z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)) ^ ((sum ^ y) + (k[(3 & p) ^ e] ^ z))) >>> 0;
            n[p] = (n[p] - mx) >>> 0;
        }
        sum = (sum - DELTA) >>> 0;
    }

    return utf8Decode(longsToStr(n)).replace(/\0+$/, '');
}

module.exports = { encrypt, decrypt };
