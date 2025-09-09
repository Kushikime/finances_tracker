import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

// Database connection string
const connectionString = process.env.DATABASE_URL ?? '';

// Create postgres connection
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 30,
});

// Create drizzle database instance
export const db = drizzle(client, { schema });

// Export schema and types
export * from './schema';
