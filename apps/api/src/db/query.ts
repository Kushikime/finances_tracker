import { pool } from './pool';

// Responsible for exporting a parameterized query(text, params) function using the pool
export async function query<T = any>(
  text: string,
  params?: any[],
): Promise<{ rows: T[] }> {
  const result = await pool.query(text, params);
  return { rows: result.rows as T[] };
}
