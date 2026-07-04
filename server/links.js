import crypto from 'crypto';
import { connectDb } from './db.js';

const LINKS_COLLECTION = 'tracking_links';
const SLUG_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const SLUG_LENGTH = 7;

async function getLinksCollection() {
  await connectDb();
  const { client } = globalThis.__portfolioMongo;
  const db = client.db(process.env.MONGODB_DB || 'portfolio');
  const collection = db.collection(LINKS_COLLECTION);
  await collection.createIndex({ slug: 1 }, { unique: true });
  return collection;
}

function generateSlug() {
  let slug = '';
  const bytes = crypto.randomBytes(SLUG_LENGTH);
  for (let i = 0; i < SLUG_LENGTH; i += 1) {
    slug += SLUG_CHARS[bytes[i] % SLUG_CHARS.length];
  }
  return slug;
}

export function getPortfolioBaseUrl(req) {
  if (process.env.PORTFOLIO_URL) {
    return process.env.PORTFOLIO_URL.replace(/\/$/, '');
  }

  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host;
  const proto = req?.headers?.['x-forwarded-proto'] || 'https';
  return host ? `${proto}://${host}` : 'https://i-abdul-raheem.vercel.app';
}

export function buildShortUrl(baseUrl, slug) {
  return `${baseUrl}/c/${slug}`;
}

export async function createTrackingLink(company, req) {
  const collection = await getLinksCollection();
  const trimmed = company?.trim();

  if (!trimmed) {
    throw new Error('Company name is required');
  }

  let slug = generateSlug();
  let attempts = 0;

  while (attempts < 5) {
    const existing = await collection.findOne({ slug });
    if (!existing) break;
    slug = generateSlug();
    attempts += 1;
  }

  const baseUrl = getPortfolioBaseUrl(req);
  const doc = {
    slug,
    company: trimmed,
    url: buildShortUrl(baseUrl, slug),
    clicks: 0,
    createdAt: new Date(),
    lastClickedAt: null
  };

  await collection.insertOne(doc);
  return doc;
}

export async function listTrackingLinks() {
  const collection = await getLinksCollection();
  return collection
    .find({})
    .sort({ createdAt: -1 })
    .project({ _id: 0, clickLog: 0 })
    .toArray();
}

export async function deleteTrackingLink(slug) {
  const collection = await getLinksCollection();
  const result = await collection.deleteOne({ slug });
  return result.deletedCount > 0;
}

export async function recordClick(slug, meta = {}) {
  const collection = await getLinksCollection();
  const link = await collection.findOne({ slug });

  if (!link) {
    return null;
  }

  const clickedAt = new Date();

  await collection.updateOne(
    { slug },
    {
      $inc: { clicks: 1 },
      $set: { lastClickedAt: clickedAt },
      $push: {
        clickLog: {
          $each: [{
            at: clickedAt,
            userAgent: meta.userAgent || null,
            referer: meta.referer || null
          }],
          $slice: -20
        }
      }
    }
  );

  return { ...link, clickedAt };
}
