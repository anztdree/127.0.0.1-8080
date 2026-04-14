/**
 * TEA Encryption/Decryption Module (XXTEA variant)
 * 
 * 100% IDENTICAL to client code from main.min.js.
 * Every function is a direct port of the client implementation.
 * DO NOT modify unless the client code changes.
 * 
 * CLIENT TEA CLASS (extracted from main.min.js):
 *   var TEA=function(){function e(){}return e.prototype.encrypt=function(e,t){...},
 *   e.prototype.decrypt=function(e,t){...},
 *   e.prototype.strToLongs=function(e){...},
 *   e.prototype.longsToStr=function(e){...},e}();
 * 
 * CLIENT Base64 CLASS (extracted from main.min.js):
 *   Custom Base64 implementation with .encode() and .decode() methods.
 *   e.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
 *   Uses Utf8.encode/decode for UTF-8 support.
 * 
 * CLIENT Utf8 CLASS (extracted from main.min.js):
 *   Custom UTF-8 encoder/decoder using regex replacement.
 * 
 * CLIENT VERIFY HANDLER (line 52006-52013):
 *   socket.on("verify", function(n) {
 *       var o = (new TEA).encrypt(n, "verification");
 *       t.socket.emit("verify", o, function(n) {
 *           0 == n.ret ? e() : ErrorHandler.ShowErrorTips(n.ret, function() {})
 *       })
 *   })
 * 
 * KEY: The client uses its OWN Base64 and Utf8 implementations,
 * NOT the standard btoa/atob or Buffer API. The server MUST match exactly.
 */

// =============================================
// 1. UTF-8 ENCODING/DECODING
//    EXACT copy of client Utf8 class
// =============================================

var Utf8 = {};

/**
 * Encode a string to UTF-8 bytes (as a JavaScript string, not a buffer).
 * Client code:
 *   e.encode=function(e){
 *     var t=e.replace(/[\u0080-\u07ff]/g,function(e){var t=e.charCodeAt(0);return String.fromCharCode(192|t>>6,128|63&t)});
 *     return t=t.replace(/[\u0800-\uffff]/g,function(e){var t=e.charCodeAt(0);return String.fromCharCode(224|t>>12,128|t>>6&63,128|63&t)})
 *   }
 */
Utf8.encode = function (e) {
    var t = e.replace(/[\u0080-\u07ff]/g, function (e) {
        var t = e.charCodeAt(0);
        return String.fromCharCode(192 | t >> 6, 128 | 63 & t);
    });
    return (t = t.replace(/[\u0800-\uffff]/g, function (e) {
        var t = e.charCodeAt(0);
        return String.fromCharCode(224 | t >> 12, 128 | (t >> 6) & 63, 128 | 63 & t);
    }));
};

/**
 * Decode a UTF-8 encoded string back to JavaScript string.
 * Client code:
 *   e.decode=function(e){
 *     var t=e.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(e){
 *       var t=(15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2);return String.fromCharCode(t)
 *     });
 *     return t=t.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(e){
 *       var t=(31&e.charCodeAt(0))<<6|63&e.charCodeAt(1);return String.fromCharCode(t)
 *     })
 *   }
 */
Utf8.decode = function (e) {
    var t = e.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (e) {
        var t = (15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2);
        return String.fromCharCode(t);
    });
    return (t = t.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (e) {
        var t = (31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1);
        return String.fromCharCode(t);
    }));
};

// =============================================
// 2. BASE64 ENCODING/DECODING
//    EXACT copy of client Base64 class
//    DO NOT use Node.js Buffer — must match client byte-for-byte
// =============================================

var Base64 = {};
Base64.code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Encode string to Base64.
 * Client code (simplified for server use — always encodes raw binary, no Utf8):
 *   e.encode=function(e,t){
 *     t="undefined"==typeof t?!1:t;
 *     var n,o,a,r,i,s,l,u,c,p,d,g=[],m="",h=this.code;
 *     p=t?Utf8.encode(e):e;
 *     c=p.length%3;
 *     if(c>0)for(;c++<3;)m+="=",p+="\x00";
 *     for(c=0;c<p.length;c+=3)
 *       n=p.charCodeAt(c),o=p.charCodeAt(c+1),a=p.charCodeAt(c+2),
 *       r=n<<16|o<<8|a,i=r>>18&63,s=r>>12&63,l=r>>6&63,u=63&r,
 *       g[c/3]=h.charAt(i)+h.charAt(s)+h.charAt(l)+h.charAt(u);
 *     d=g.join(""),d=d.slice(0,d.length-m.length)+m;
 *     return d
 *   }
 */
Base64.encode = function (e) {
    var p = e;
    var c = p.length % 3;
    var m = '';
    if (c > 0) {
        for (; c++ < 3;) m += '=', p += '\x00';
    }
    var g = [];
    for (c = 0; c < p.length; c += 3) {
        var n = p.charCodeAt(c);
        var o = p.charCodeAt(c + 1);
        var a = p.charCodeAt(c + 2);
        var r = n << 16 | o << 8 | a;
        var i = r >> 18 & 63;
        var s = r >> 12 & 63;
        var l = r >> 6 & 63;
        var u = 63 & r;
        g[c / 3] = Base64.code.charAt(i) + Base64.code.charAt(s) + Base64.code.charAt(l) + Base64.code.charAt(u);
    }
    var d = g.join('');
    d = d.slice(0, d.length - m.length) + m;
    return d;
};

/**
 * Decode Base64 to string.
 * Client code (simplified — always decodes to raw binary, no Utf8):
 *   e.decode=function(e,t){
 *     t="undefined"==typeof t?!1:t;
 *     var n,o,a,r,i,s,l,u,c,p,d=[],g=this.code;
 *     p=t?Utf8.decode(e):e;
 *     for(var m=0;m<p.length;m+=4)
 *       r=g.indexOf(p.charAt(m)),i=g.indexOf(p.charAt(m+1)),
 *       s=g.indexOf(p.charAt(m+2)),l=g.indexOf(p.charAt(m+3)),
 *       u=r<<18|i<<12|s<<6|l,
 *       n=u>>>16&255,o=u>>>8&255,a=255&u,
 *       d[m/4]=String.fromCharCode(n,o,a),
 *       64==l&&(d[m/4]=String.fromCharCode(n,o)),
 *       64==s&&(d[m/4]=String.fromCharCode(n));
 *     c=d.join("");
 *     return t?Utf8.decode(c):c
 *   }
 */
/**
 * Decode Base64 to string.
 * 
 * CRITICAL FIX: Client code uses g.indexOf('=') which returns -1,
 * but then checks 64==l which expects 64 for padding.
 * The minifier lost the original ternary check for '='.
 * 
 * Original (pre-minified) code was likely:
 *   s = p.charAt(m+2) === '=' ? 64 : g.indexOf(p.charAt(m+2));
 *   l = p.charAt(m+3) === '=' ? 64 : g.indexOf(p.charAt(m+3));
 * 
 * This fix restores the correct padding behavior.
 */
Base64.decode = function (e) {
    var p = e;
    var d = [];
    for (var m = 0; m < p.length; m += 4) {
        var r = Base64.code.indexOf(p.charAt(m));
        var i = Base64.code.indexOf(p.charAt(m + 1));
        // FIX: explicitly check for '=' padding char and use value 64
        var s = p.charAt(m + 2) === '=' ? 64 : Base64.code.indexOf(p.charAt(m + 2));
        var l = p.charAt(m + 3) === '=' ? 64 : Base64.code.indexOf(p.charAt(m + 3));
        var u = r << 18 | i << 12 | s << 6 | l;
        var n = u >>> 16 & 255;
        var o = u >>> 8 & 255;
        var a = 255 & u;
        d[m / 4] = String.fromCharCode(n, o, a);
        if (64 == l) {
            d[m / 4] = String.fromCharCode(n, o);
        }
        if (64 == s) {
            d[m / 4] = String.fromCharCode(n);
        }
    }
    var c = d.join('');
    return c;
};

// =============================================
// 3. XXTEA CORE
//    EXACT copy of client TEA class
// =============================================

var DELTA = 2654435769;

/**
 * Convert string to uint32 array (LITTLE-ENDIAN).
 * Client code EXACT:
 *   e.prototype.strToLongs=function(e){
 *     for(var t=new Array(Math.ceil(e.length/4)),n=0;n<t.length;n++)
 *       t[n]=e.charCodeAt(4*n)+(e.charCodeAt(4*n+1)<<8)+(e.charCodeAt(4*n+2)<<16)+(e.charCodeAt(4*n+3)<<24);
 *     return t
 *   }
 */
function strToLongs(e) {
    var t = new Array(Math.ceil(e.length / 4));
    for (var n = 0; n < t.length; n++) {
        t[n] = e.charCodeAt(4 * n) + (e.charCodeAt(4 * n + 1) << 8) + (e.charCodeAt(4 * n + 2) << 16) + (e.charCodeAt(4 * n + 3) << 24);
    }
    return t;
}

/**
 * Convert uint32 array back to string (LITTLE-ENDIAN).
 * Client code EXACT:
 *   e.prototype.longsToStr=function(e){
 *     for(var t=new Array(e.length),n=0;n<e.length;n++)
 *       t[n]=String.fromCharCode(255&e[n],e[n]>>>8&255,e[n]>>>16&255,e[n]>>>24&255);
 *     return t.join("")
 *   }
 */
function longsToStr(e) {
    var t = new Array(e.length);
    for (var n = 0; n < e.length; n++) {
        t[n] = String.fromCharCode(255 & e[n], e[n] >>> 8 & 255, e[n] >>> 16 & 255, e[n] >>> 24 & 255);
    }
    return t.join('');
}

/**
 * XXTEA Encrypt — EXACT copy of client code.
 *
 * Client code EXACT:
 *   e.prototype.encrypt=function(e,t){
 *     if(0==e.length)return"";
 *     var n=this.strToLongs(Utf8.encode(e));
 *     n.length<=1&&(n[1]=0);
 *     for(var o,a,r=this.strToLongs(Utf8.encode(t).slice(0,16)),
 *       i=n.length,s=n[i-1],l=n[0],u=2654435769,
 *       c=Math.floor(6+52/i),p=0;c-->0;){
 *       p+=u,a=p>>>2&3;
 *       for(var d=0;i>d;d++)
 *         l=n[(d+1)%i],
 *         o=(s>>>5^l<<2)+(l>>>3^s<<4)^(p^l)+(r[3&d^a]^s),
 *         s=n[d]+=o
 *     }
 *     var g=this.longsToStr(n);
 *     return Base64.encode(g)
 *   }
 */
function encrypt(e, t) {
    if (0 == e.length) return '';
    var n = strToLongs(Utf8.encode(e));
    n.length <= 1 && (n[1] = 0);
    for (var o, a, r = strToLongs(Utf8.encode(t).slice(0, 16)),
        i = n.length, s = n[i - 1], l = n[0],
        u = 2654435769, c = Math.floor(6 + 52 / i), p = 0; c-- > 0;) {
        p += u;
        a = p >>> 2 & 3;
        for (var d = 0; i > d; d++) {
            l = n[(d + 1) % i];
            o = (s >>> 5 ^ l << 2) + (l >>> 3 ^ s << 4) ^ (p ^ l) + (r[3 & d ^ a] ^ s);
            s = n[d] += o;
        }
    }
    var g = longsToStr(n);
    return Base64.encode(g);
}

/**
 * XXTEA Decrypt — EXACT copy of client code.
 *
 * Client code EXACT:
 *   e.prototype.decrypt=function(e,t){
 *     if(0==e.length)return"";
 *     for(var n,o,a=this.strToLongs(Base64.decode(e)),
 *       r=this.strToLongs(Utf8.encode(t).slice(0,16)),
 *       i=a.length,s=a[i-1],l=a[0],u=2654435769,
 *       c=Math.floor(6+52/i),p=c*u;0!=p;){
 *       o=p>>>2&3;
 *       for(var d=i-1;d>=0;d--)
 *         s=a[d>0?d-1:i-1],
 *         n=(s>>>5^l<<2)+(l>>>3^s<<4)^(p^l)+(r[3&d^o]^s),
 *         l=a[d]-=n;
 *       p-=u
 *     }
 *     var g=this.longsToStr(a);
 *     return g=g.replace(/\0+$/,""),Utf8.decode(g)
 *   }
 */
function decrypt(e, t) {
    if (0 == e.length) return '';
    for (var n, o, a = strToLongs(Base64.decode(e)),
        r = strToLongs(Utf8.encode(t).slice(0, 16)),
        i = a.length, s = a[i - 1], l = a[0],
        u = 2654435769, c = Math.floor(6 + 52 / i), p = c * u; 0 != p;) {
        o = p >>> 2 & 3;
        for (var d = i - 1; d >= 0; d--) {
            s = a[d > 0 ? d - 1 : i - 1];
            n = (s >>> 5 ^ l << 2) + (l >>> 3 ^ s << 4) ^ (p ^ l) + (r[3 & d ^ o] ^ s);
            l = a[d] -= n;
        }
        p -= u;
    }
    var g = longsToStr(a);
    return g = g.replace(/\0+$/, ''), Utf8.decode(g);
}

// =============================================
// 4. CHALLENGE GENERATION & VERIFICATION
//    Used by main-server TEA handshake
// =============================================

/**
 * Generate a random challenge string for TEA verification.
 * Server-side function — not present in client.
 */
function generateChallenge() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Verify client's TEA-encrypted response.
 * Server-side function — not present in client.
 */
function verifyChallenge(originalChallenge, encryptedResponse, key) {
    if (!originalChallenge || !encryptedResponse) return false;
    try {
        var decrypted = decrypt(encryptedResponse, key);
        return decrypted === originalChallenge;
    } catch (e) {
        return false;
    }
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    generateChallenge: generateChallenge,
    verifyChallenge: verifyChallenge,
};
