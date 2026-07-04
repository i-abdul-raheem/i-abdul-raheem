import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import {
  connectDb,
  closeDb,
  readAllContent,
  writeAllContent,
  writeLocale
} from './db.js';
import { createToken, isAuthorized } from './auth.js';
import {
  createTrackingLink,
  listTrackingLinks,
  deleteTrackingLink,
  recordClick,
  getPortfolioBaseUrl
} from './links.js';
import { sendPortfolioOpenEmail } from './email.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: [
    ...(process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((url) => url.trim()),
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
}));
app.use(express.json({ limit: '2mb' }));

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body ?? {};

  if (password !== (process.env.ADMIN_PASSWORD || 'portfolio-admin')) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  res.json({ token: createToken() });
});

app.get('/api/content', async (_req, res) => {
  try {
    const content = await readAllContent();
    res.json({ en: content.en, de: content.de, updatedAt: content.updatedAt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/content/:locale', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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

app.put('/api/content', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await writeAllContent(req.body ?? {});
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/links', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const links = await listTrackingLinks();
    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/links', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const link = await createTrackingLink(req.body?.company, req);
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/links', async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const deleted = await deleteTrackingLink(req.body?.slug);
    if (!deleted) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/c/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const link = await recordClick(slug, {
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer
    });

    if (!link) {
      return res.status(404).send('Link not found');
    }

    try {
      await sendPortfolioOpenEmail({
        company: link.company,
        slug: link.slug,
        clickedAt: link.clickedAt,
        userAgent: req.headers['user-agent']
      });
    } catch (err) {
      console.error('Email failed:', err.message);
    }

    res.redirect(302, `${getPortfolioBaseUrl(req)}/`);
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
