import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import {
  connectDb,
  closeDb,
  readAllContent,
  writeAllContent,
  writeLocale
} from './db.js';

const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'portfolio-admin';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();

const allowedOrigins = [
  ...(process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((url) => url.trim()),
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter((value, index, list) => value && list.indexOf(value) === index);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  }
}));
app.use(express.json({ limit: '2mb' }));

function createToken() {
  const payload = Buffer.from(JSON.stringify({ iat: Date.now() })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false;

  const [payload, signature] = token.split('.');
  const expected = crypto
    .createHmac('sha256', ADMIN_PASSWORD)
    .update(payload)
    .digest('base64url');

  return signature === expected;
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body ?? {};

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = createToken();
  res.json({ token });
});

app.get('/api/content', async (_req, res) => {
  try {
    const content = await readAllContent();
    res.json({ en: content.en, de: content.de, updatedAt: content.updatedAt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/content/:locale', authRequired, async (req, res) => {
  const { locale } = req.params;

  if (locale !== 'en' && locale !== 'de') {
    return res.status(400).json({ error: 'Invalid locale' });
  }

  try {
    await writeLocale(locale, req.body);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/content', authRequired, async (req, res) => {
  const { en, de } = req.body ?? {};

  try {
    await writeAllContent({ en, de });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', async (_req, res) => {
  try {
    await readAllContent();
    res.json({ ok: true, storage: 'mongodb' });
  } catch (error) {
    res.status(503).json({ ok: false, error: error.message });
  }
});

async function start() {
  try {
    await connectDb();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Portfolio admin API running on port ${PORT}`);
      console.log(`MongoDB connected (${process.env.MONGODB_DB || 'portfolio'})`);
      console.log(`Allowed client origin: ${CLIENT_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await closeDb();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDb();
  process.exit(0);
});

start();
