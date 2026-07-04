import { connectDb, readAllContent, writeAllContent } from '../../server/db.js';
import { isAuthorized } from '../../server/auth.js';

export default async function handler(req, res) {
  try {
    await connectDb();

    if (req.method === 'GET') {
      const content = await readAllContent();
      return res.status(200).json({
        en: content.en,
        de: content.de,
        updatedAt: content.updatedAt
      });
    }

    if (req.method === 'PUT') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await writeAllContent(req.body ?? {});
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
