import './loadEnv.js';
import { connectDb, closeDb, resetFromSeed } from './db.js';

async function seed() {
  try {
    await connectDb();
    await resetFromSeed();
    console.log('Portfolio content reset from locale JSON seed data.');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
}

seed();
