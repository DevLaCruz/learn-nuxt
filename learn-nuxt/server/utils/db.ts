import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import * as schema from '../db/schema';

const dbPath = join(process.cwd(), 'data', 'database.sqlite');
mkdirSync(dirname(dbPath), { recursive: true });

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle({ client, schema });
export default db;
