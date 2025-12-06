import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

const connectionString = DATABASE_URL;

// const connectionString = process.env.DATABASE_URL as string;
export const sql = neon(connectionString);
