import { connectDb, readAllContent } from '../server/db.js';

export default async function handler(_req, res) {
  try {
    await connectDb();
    await readAllContent();
    return res.status(200).json({ ok: true, storage: 'mongodb' });
  } catch (error) {
    return res.status(503).json({ ok: false, error: error.message });
  }
}
