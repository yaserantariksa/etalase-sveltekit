import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

const connectionString = DATABASE_URL;

const client = neon(connectionString);
export const db = drizzle(client, { schema });
