import { MongoClient } from 'mongodb';
import enSeed from '../src/locales/en.json' with { type: 'json' };
import deSeed from '../src/locales/de.json' with { type: 'json' };

const CONTENT_ID = 'portfolio';

let client;
let collection;
let dbName;

function getMongoConfig() {
  return {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    name: process.env.MONGODB_DB || 'portfolio'
  };
}

export async function connectDb() {
  const { uri, name } = getMongoConfig();
  dbName = name;
  client = new MongoClient(uri);
  await client.connect();
  collection = client.db(dbName).collection('content');
  await collection.createIndex({ _id: 1 });
  await seedIfEmpty();
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = null;
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
