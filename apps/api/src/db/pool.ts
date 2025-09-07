import '../env-setup';
import { Pool } from 'pg';
import { getDbConfig } from '../config/env.util';

// Responsible for initializing and exporting a singleton pg.Pool using DATABASE_URL and SSL config

const dbConfig = getDbConfig();

export const pool = new Pool(dbConfig);
