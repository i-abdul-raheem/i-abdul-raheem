import { MongoClient } from 'mongodb';
import enSeed from '../src/locales/en.json' with { type: 'json' };
import deSeed from '../src/locales/de.json' with { type: 'json' };

const CONTENT_ID = 'portfolio';

let collection;

function getMongoConfig() {
  return {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    name: process.env.MONGODB_DB || 'portfolio'
  };
}

export async function connectDb() {
  if (collection) {
    return collection;
  }

  const cached = globalThis.__portfolioMongo;

  if (cached?.collection) {
    collection = cached.collection;
    return collection;
  }

  const { uri, name } = getMongoConfig();
  const client = new MongoClient(uri);
  await client.connect();
  collection = client.db(name).collection('content');
  await collection.createIndex({ _id: 1 });

  globalThis.__portfolioMongo = { client, collection };

  await seedIfEmpty();
  return collection;
}

export async function closeDb() {
  const cached = globalThis.__portfolioMongo;

  if (cached?.client) {
    await cached.client.close();
    globalThis.__portfolioMongo = null;
    collection = null;
  }
}

async function seedIfEmpty() {
  const existing = await collection.findOne({ _id: CONTENT_ID });

  if (existing?.en && existing?.de) {
    return existing;
  }

  const seeded = {
    _id: CONTENT_ID,
    en: existing?.en ?? enSeed,
    de: existing?.de ?? deSeed,
    updatedAt: new Date()
  };

  await collection.updateOne(
    { _id: CONTENT_ID },
    { $set: seeded },
    { upsert: true }
  );

  console.log('Seeded portfolio content into MongoDB');
  return seeded;
}

export async function readAllContent() {
  await connectDb();
  const doc = await collection.findOne({ _id: CONTENT_ID });

  if (!doc?.en || !doc?.de) {
    return seedIfEmpty();
  }

  return { en: doc.en, de: doc.de, updatedAt: doc.updatedAt };
}

export async function readLocale(locale) {
  const doc = await readAllContent();
  return doc[locale];
}

export async function writeLocale(locale, data) {
  await connectDb();
  await collection.updateOne(
    { _id: CONTENT_ID },
    {
      $set: {
        [locale]: data,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function writeAllContent({ en, de }) {
  await connectDb();
  const update = { updatedAt: new Date() };
  if (en) update.en = en;
  if (de) update.de = de;

  await collection.updateOne(
    { _id: CONTENT_ID },
    { $set: update },
    { upsert: true }
  );
}

export async function resetFromSeed() {
  await connectDb();
  await collection.updateOne(
    { _id: CONTENT_ID },
    {
      $set: {
        en: enSeed,
        de: deSeed,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}
