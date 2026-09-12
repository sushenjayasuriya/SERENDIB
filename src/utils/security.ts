// Serendib Cryptographic Vault & Security Utilities

export const MASTER_SALT = 'SERENDIB_SALT_2026_SECURE_VAULT_';

// Default master SHA-256 hashes (passcodes: 'serendib2026', 'admin@serendib', 'serendib_curator_2026')
export const DEFAULT_MASTER_HASHES = [
  'a72641d59fa7b4b7a1089460334e6d66b806e65d6e11f853a98e9acc3200b04e', // serendib2026
  '1174cc79e99638c9698de8613d714b173518feda8c466ca560cd2cec3d71081f', // admin@serendib
  '1cf31bc0b7891b8fbdf9cc8e792334500545ca96281ec2edd6fa38cf766ff1e6'  // serendib_curator_2026
];

export const MAX_AUTH_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
export const SESSION_INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes auto-lock

export interface LockoutState {
  attempts: number;
  lockedUntil: number | null;
}

export interface SessionTokenData {
  token: string;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Computes Web Crypto SHA-256 hex digest with cryptographic salt
 */
export async function computeSaltedHash(passcode: string, salt: string = MASTER_SALT): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + passcode.trim());
  
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback if subtle crypto unavailable (e.g. non-HTTPS test environments)
  let hash = 0;
  const str = salt + passcode.trim();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

/**
 * Generates a random cryptographic session token
 */
export function generateSessionToken(): SessionTokenData {
  const randomBytes = new Uint8Array(24);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes);
  } else {
    for (let i = 0; i < 24; i++) randomBytes[i] = Math.floor(Math.random() * 256);
  }
  
  const token = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const now = Date.now();
  
  return {
    token,
    issuedAt: now,
    expiresAt: now + SESSION_INACTIVITY_MS
  };
}
