import { pool } from './pool';
import type { PoolClient } from 'pg';

// Responsible for exporting a parameterized query(text, params) function using the pool or a transaction client
export async function query<T = any>(
  text: string,
  params?: any[],
  client?: PoolClient,
): Promise<{ rows: T[] }> {
  const executor = client ?? pool;
  const result = await executor.query(text, params);
  return { rows: result.rows as T[] };
}
