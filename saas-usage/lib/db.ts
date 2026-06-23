// Database connection utility
// Supports both demo mode (no DB) and production mode (PostgreSQL)

import { Pool } from 'pg'

let pool: Pool | null = null

export function getDb() {
  const isDemoMode = process.env.DEMO_MODE === 'true'

  if (isDemoMode) {
    // Demo mode - no database connection needed
    return null
  }

  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required when DEMO_MODE=false')
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  }

  return pool
}

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === 'true'
}

export async function query(text: string, params?: any[]) {
  const db = getDb()

  if (!db) {
    throw new Error('Database not available in demo mode')
  }

  const result = await db.query(text, params)
  return result
}
