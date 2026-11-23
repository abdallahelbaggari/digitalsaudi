// Minimal Stellar/Pi transaction builder for one native payment (App-to-User payouts).
// Follows the Stellar XDR spec: TransactionEnvelope (ENVELOPE_TYPE_TX) with a single PAYMENT operation,
// a text memo, time bounds, and one Ed25519 signature. Uses only Web Crypto (Cloudflare Workers / Node 20+).

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const VER_ACCOUNT = 6 << 3;   // 'G…'
const VER_SEED = 18 << 3;     // 'S…'

function crc16(bytes) {          // CRC16-XModem, as used by Stellar strkeys
  let crc = 0;
  for (const b of bytes) {
    crc ^= b << 8;
    for (let i = 0; i < 8; i++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc;
}
function b32decode(s) {
  let bits = 0, val = 0; const out = [];
  for (const ch of s) { const i = B32.indexOf(ch); if (i < 0) throw new Error('bad base32'); val = (val << 5) | i; bits += 5; if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; } }
  return new Uint8Array(out);
}
function b32encode(bytes) {
  let bits = 0, val = 0, out = '';
  for (const b of bytes) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } }
  if (bits > 0) out += B32[(val << (5 - bits)) & 31];
  return out;
}
export function strkeyDecode(s, version) {
  const raw = b32decode(String(s || '').trim());
  if (raw.length !== 35 || raw[0] !== version) throw new Error('bad key');
  const body = raw.slice(0, 33), sum = raw[33] | (raw[34] << 8);
  if (crc16(body) !== sum) throw new Error('bad checksum');
  return raw.slice(1, 33);
}
export function strkeyEncode(bytes32, version) {
  const body = new Uint8Array(33); body[0] = version; body.set(bytes32, 1);
  const c = crc16(body), out = new Uint8Array(35); out.set(body); out[33] = c & 255; out[34] = c >> 8;
  return b32encode(out);
}
export const accountFromBytes = (b) => strkeyEncode(b, VER_ACCOUNT);
export const accountToBytes = (s) => strkeyDecode(s, VER_ACCOUNT);

/* XDR writer */
class X {
  constructor() { this.a = []; }
  u32(n) { this.a.push((n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255); return this; }
  i32(n) { return this.u32(n >>> 0); }
  i64(big) { const v = BigInt.asUintN(64, BigInt(big)); this.u32(Number(v >> 32n)); this.u32(Number(v & 0xffffffffn)); return this; }
  fixed(bytes) { for (const b of bytes) this.a.push(b); return this; }
  pad(n) { while (n % 4) { this.a.push(0); n++; } return this; }
  varOpaque(bytes) { this.u32(bytes.length); this.fixed(bytes); return this.pad(bytes.length); }
  bytes() { return new Uint8Array(this.a); }
}
const enc = new TextEncoder();
async function sha256(bytes) { return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)); }
const b64 = (u8) => { let s = ''; for (const b of u8) s += String.fromCharCode(b); return btoa(s); };
const b64url = (u8) => b64(u8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/* Keys: from an 'S…' seed to a signing key and the matching 'G…' address */
export async function keypairFromSeed(seedStr) {
  const seed = strkeyDecode(seedStr, VER_SEED);
  const pkcs8 = new Uint8Array(48);
  pkcs8.set([0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20]); pkcs8.set(seed, 16);
  const key = await crypto.subtle.importKey('pkcs8', pkcs8, { name: 'Ed25519' }, true, ['sign']);
  const jwk = await crypto.subtle.exportKey('jwk', key);
  const pub = Uint8Array.from(atob(jwk.x.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((jwk.x.length + 3) % 4)), (c) => c.charCodeAt(0));
  return { key, pub, address: accountFromBytes(pub) };
}

/* Amount in π (string or number, up to 7 decimals) → int64 stroops */
export function toStroops(amount) {
  const s = typeof amount === 'number' ? amount.toFixed(7).replace(/\.?0+$/, '') : String(amount); if (!/^\d+(\.\d{1,7})?$/.test(s)) throw new Error('bad amount');
  const [i, f = ''] = s.split('.'); return BigInt(i) * 10000000n + BigInt((f + '0000000').slice(0, 7));
}

/* Build and sign: one native payment, text memo (≤ 28 bytes), time bounds. Returns { xdr (base64), hash (hex) } */
export async function buildPayment({ kp, sequence, fee, destination, amount, memo, passphrase, timeoutSec = 180, now = Math.floor(Date.now() / 1000) }) {
  const memoBytes = enc.encode(String(memo || ''));
  if (memoBytes.length > 28) throw new Error('memo too long');
  const tx = new X();
  tx.i32(0).fixed(kp.pub);                                  // sourceAccount: MuxedAccount KEY_TYPE_ED25519
  tx.u32(Number(fee));                                       // fee (total, stroops)
  tx.i64(BigInt(sequence) + 1n);                             // seqNum
  tx.i32(1).i64(0).i64(now + timeoutSec);                    // cond: PRECOND_TIME { minTime, maxTime }
  tx.i32(1).varOpaque(memoBytes);                            // memo: MEMO_TEXT
  tx.u32(1);                                                 // one operation
  tx.u32(0);                                                 //   no per-operation source account
  tx.i32(1);                                                 //   PAYMENT
  tx.i32(0).fixed(accountToBytes(destination));              //   destination: MuxedAccount KEY_TYPE_ED25519
  tx.i32(0);                                                 //   asset: ASSET_TYPE_NATIVE
  tx.i64(toStroops(amount));                                 //   amount
  tx.i32(0);                                                 // ext v0
  const txBytes = tx.bytes();
  const networkId = await sha256(enc.encode(passphrase));
  const payload = new Uint8Array(32 + 4 + txBytes.length);
  payload.set(networkId, 0); payload.set([0, 0, 0, 2], 32); payload.set(txBytes, 36);   // ENVELOPE_TYPE_TX = 2
  const hash = await sha256(payload);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: 'Ed25519' }, kp.key, hash));
  const env = new X();
  env.i32(2).fixed(txBytes);                                 // TransactionEnvelope: ENVELOPE_TYPE_TX, TransactionV1Envelope.tx
  env.u32(1).fixed(kp.pub.slice(28)).varOpaque(sig);         // one DecoratedSignature { hint, signature }
  return { xdr: b64(env.bytes()), hash: Array.from(hash, (b) => b.toString(16).padStart(2, '0')).join('') };
}
export { b64url };
