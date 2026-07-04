import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'portfolio-admin';

export function createToken() {
  const payload = Buffer.from(JSON.stringify({ iat: Date.now() })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifyToken(token) {
  if (!token || !token.includes('.')) return false;

  const [payload, signature] = token.split('.');
  const expected = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(payload)
    .digest('base64url');

  return signature === expected;
}

export function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

export function isAuthorized(req) {
  return verifyToken(getBearerToken(req));
}
