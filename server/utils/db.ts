import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { join } from 'node:path';
import * as schema from '../db/schema';

const sqlite = new Database(join(process.cwd(), 'data/database.sqlite'));

export const db = drizzle(sqlite, { schema });
export default db;
