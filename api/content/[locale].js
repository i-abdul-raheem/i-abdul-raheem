import { connectDb, writeLocale } from '../../server/db.js';
import { isAuthorized } from '../../server/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDb();

    if (!isAuthorized(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { locale } = req.query;

    if (locale !== 'en' && locale !== 'de') {
      return res.status(400).json({ error: 'Invalid locale' });
    }

    await writeLocale(locale, req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
