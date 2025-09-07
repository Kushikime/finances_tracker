import { parse } from 'pg-connection-string';

// Utility to read and validate environment variables for DB and app config
export function getDbConfig() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const config = parse(url);
  // SSL config: disable in dev, enable in prod
  const isProd = process.env.NODE_ENV === 'production';
  if (!config.database)
    throw new Error('Database name missing in DATABASE_URL');
  return {
    user: config.user,
    password: config.password,
    host: config.host ?? undefined,
    port: config.port ? Number(config.port) : 5432,
    database: config.database, // always string
    ssl: isProd ? { rejectUnauthorized: false } : false,
  };
}
