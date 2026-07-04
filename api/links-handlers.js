import {
  createTrackingLink,
  listTrackingLinks,
  deleteTrackingLink,
  recordClick,
  getPortfolioBaseUrl
} from '../server/links.js';
import { isAuthorized } from '../server/auth.js';
import { sendPortfolioOpenEmail } from '../server/email.js';

export default async function linksHandler(req, res) {
  try {
    if (req.method === 'GET') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const links = await listTrackingLinks();
      return res.status(200).json({ links });
    }

    if (req.method === 'POST') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { company } = req.body ?? {};
      const link = await createTrackingLink(company, req);
      return res.status(201).json({ link });
    }

    if (req.method === 'DELETE') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { slug } = req.body ?? {};
      const deleted = await deleteTrackingLink(slug);

      if (!deleted) {
        return res.status(404).json({ error: 'Link not found' });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API /links error:', error);
    return res.status(500).json({ error: error.message });
  }
}

export async function redirectHandler(req, res) {
  try {
    const { slug } = req.query;
    const link = await recordClick(slug, {
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer
    });

    if (!link) {
      return res.status(404).send('Link not found');
    }

    sendPortfolioOpenEmail({
      company: link.company,
      slug: link.slug,
      clickedAt: link.clickedAt,
      userAgent: req.headers['user-agent']
    }).catch((err) => console.error('Email failed:', err.message));

    const destination = `${getPortfolioBaseUrl(req)}/`;
    res.writeHead(302, { Location: destination });
    return res.end();
  } catch (error) {
    console.error('Redirect error:', error);
    return res.status(500).json({ error: error.message });
  }
}
