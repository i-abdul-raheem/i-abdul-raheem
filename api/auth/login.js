import { connectDb } from '../../server/db.js';
import { createToken } from '../../server/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body ?? {};

    if (password !== (process.env.ADMIN_PASSWORD || 'portfolio-admin')) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({ token: createToken() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
