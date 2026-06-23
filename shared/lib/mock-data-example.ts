/**
 * DEMO MODE - Mock Data Example
 *
 * This file demonstrates how to structure data for your application.
 * In production, this data would come from your database.
 *
 * IMPLEMENTATION GUIDE:
 * ---------------------
 * 1. Set up your database (PostgreSQL, MySQL, MongoDB, etc.)
 * 2. Create tables/collections matching these structures
 * 3. Replace these mock functions with real database queries
 * 4. Add proper error handling and validation
 * 5. Implement caching for frequently accessed data
 */

// =============================================================================
// USERS
// =============================================================================

/**
 * In production, implement:
 *
 * import { db } from '@/lib/db'
 *
 * export async function getUser(userId: string) {
 *   return await db.query(
 *     'SELECT id, email, name, created_at FROM users WHERE id = $1',
 *     [userId]
 *   )
 * }
 *
 * export async function createUser(email: string, hashedPassword: string) {
 *   return await db.query(
 *     'INSERT INTO users (email, password_hash, created_at) VALUES ($1, $2, NOW()) RETURNING *',
 *     [email, hashedPassword]
 *   )
 * }
 */

export const mockUser = {
  id: process.env.DEMO_USER_ID || 'demo_user_123',
  email: process.env.DEMO_USER_EMAIL || 'demo@example.com',
  name: 'Demo User',
  createdAt: '2026-01-15T10:00:00Z',
  avatarUrl: null,
}

// =============================================================================
// PROJECTS (flat-subscription template)
// =============================================================================

/**
 * In production, implement:
 *
 * export async function getProjects(userId: string) {
 *   return await db.query(
 *     'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
 *     [userId]
 *   )
 * }
 *
 * export async function createProject(userId: string, name: string) {
 *   return await db.query(
 *     'INSERT INTO projects (user_id, name, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
 *     [userId, name, 'active']
 *   )
 * }
 */

export const mockProjects = [
  {
    id: '1',
    userId: mockUser.id,
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'in_progress',
    memberCount: 5,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-06-15T14:30:00Z',
  },
  {
    id: '2',
    userId: mockUser.id,
    name: 'Mobile App MVP',
    description: 'Initial version of mobile application',
    status: 'active',
    memberCount: 3,
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-06-20T16:45:00Z',
  },
  {
    id: '3',
    userId: mockUser.id,
    name: 'API Documentation',
    description: 'Comprehensive API documentation',
    status: 'completed',
    memberCount: 2,
    createdAt: '2026-03-05T11:00:00Z',
    updatedAt: '2026-05-30T12:00:00Z',
  },
]

// =============================================================================
// API KEYS (saas-usage template)
// =============================================================================

/**
 * In production, implement:
 *
 * export async function getApiKeys(userId: string) {
 *   return await db.query(
 *     'SELECT id, name, key_prefix, created_at, last_used_at FROM api_keys WHERE user_id = $1',
 *     [userId]
 *   )
 * }
 *
 * export async function createApiKey(userId: string, name: string) {
 *   const key = generateSecureKey() // Use crypto.randomBytes
 *   const keyHash = await hashKey(key) // Use bcrypt
 *
 *   await db.query(
 *     'INSERT INTO api_keys (user_id, name, key_hash, key_prefix, created_at) VALUES ($1, $2, $3, $4, NOW())',
 *     [userId, name, keyHash, key.slice(0, 7)]
 *   )
 *
 *   return key // Return once, never store plain key
 * }
 */

export const mockApiKeys = [
  {
    id: '1',
    userId: mockUser.id,
    name: 'Production API',
    keyPrefix: 'sk_live',
    lastUsed: '2026-06-22T10:30:00Z',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    userId: mockUser.id,
    name: 'Development API',
    keyPrefix: 'sk_test',
    lastUsed: '2026-06-23T08:15:00Z',
    createdAt: '2026-02-01T09:00:00Z',
  },
]

// =============================================================================
// USAGE LOGS (saas-usage, compute templates)
// =============================================================================

/**
 * In production, implement:
 *
 * export async function logUsage(userId: string, data: UsageData) {
 *   return await db.query(
 *     'INSERT INTO usage_logs (user_id, endpoint, method, status, tokens, duration_ms, timestamp) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
 *     [userId, data.endpoint, data.method, data.status, data.tokens, data.duration]
 *   )
 * }
 *
 * export async function getUsageStats(userId: string, startDate: Date, endDate: Date) {
 *   return await db.query(
 *     'SELECT DATE(timestamp) as date, COUNT(*) as requests, SUM(tokens) as tokens FROM usage_logs WHERE user_id = $1 AND timestamp BETWEEN $2 AND $3 GROUP BY DATE(timestamp)',
 *     [userId, startDate, endDate]
 *   )
 * }
 */

export const mockUsageLogs = [
  {
    id: '1',
    userId: mockUser.id,
    method: 'POST',
    endpoint: '/v1/completions',
    status: 200,
    tokens: 1247,
    durationMs: 342,
    timestamp: '2026-06-23T10:15:00Z',
  },
  {
    id: '2',
    userId: mockUser.id,
    method: 'POST',
    endpoint: '/v1/chat/completions',
    status: 200,
    tokens: 2451,
    durationMs: 589,
    timestamp: '2026-06-23T10:20:00Z',
  },
  {
    id: '3',
    userId: mockUser.id,
    method: 'GET',
    endpoint: '/v1/models',
    status: 200,
    tokens: 0,
    durationMs: 45,
    timestamp: '2026-06-23T10:25:00Z',
  },
]

// =============================================================================
// INSTANCES (compute template)
// =============================================================================

/**
 * In production, implement:
 *
 * export async function getInstances(userId: string) {
 *   return await db.query(
 *     'SELECT * FROM instances WHERE user_id = $1 ORDER BY created_at DESC',
 *     [userId]
 *   )
 * }
 *
 * export async function createInstance(userId: string, type: string, region: string) {
 *   return await db.query(
 *     'INSERT INTO instances (user_id, type, region, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
 *     [userId, type, region, 'provisioning']
 *   )
 * }
 */

export const mockInstances = [
  {
    id: '1',
    userId: mockUser.id,
    name: 'production-api-01',
    type: 'medium',
    vcpu: 2,
    ram: 4,
    status: 'running',
    region: 'us-east-1',
    computeHours: 127.4,
    costMtd: 38.22,
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: '2',
    userId: mockUser.id,
    name: 'staging-web-01',
    type: 'small',
    vcpu: 1,
    ram: 2,
    status: 'running',
    region: 'us-west-2',
    computeHours: 89.2,
    costMtd: 17.84,
    createdAt: '2026-06-05T14:00:00Z',
  },
  {
    id: '3',
    userId: mockUser.id,
    name: 'dev-test-01',
    type: 'small',
    vcpu: 1,
    ram: 2,
    status: 'stopped',
    region: 'eu-west-1',
    computeHours: 45.6,
    costMtd: 9.12,
    createdAt: '2026-06-10T09:00:00Z',
  },
]

// =============================================================================
// CREDITS & TRANSACTIONS (credit-based template)
// =============================================================================

/**
 * In production, implement:
 *
 * export async function getCreditBalance(userId: string) {
 *   const result = await db.query(
 *     'SELECT balance FROM credit_accounts WHERE user_id = $1',
 *     [userId]
 *   )
 *   return result.rows[0]?.balance || 0
 * }
 *
 * export async function deductCredits(userId: string, amount: number, actionId: string) {
 *   // Use transaction for atomic operation
 *   return await db.transaction(async (trx) => {
 *     const account = await trx.query(
 *       'SELECT balance FROM credit_accounts WHERE user_id = $1 FOR UPDATE',
 *       [userId]
 *     )
 *
 *     if (account.rows[0].balance < amount) {
 *       throw new Error('Insufficient credits')
 *     }
 *
 *     await trx.query(
 *       'UPDATE credit_accounts SET balance = balance - $1 WHERE user_id = $2',
 *       [amount, userId]
 *     )
 *
 *     await trx.query(
 *       'INSERT INTO credit_transactions (user_id, type, amount, action_id, created_at) VALUES ($1, $2, $3, $4, NOW())',
 *       [userId, 'deduct', -amount, actionId]
 *     )
 *   })
 * }
 */

export const mockCreditBalance = 1250

export const mockTransactions = [
  {
    id: '1',
    userId: mockUser.id,
    type: 'purchase',
    amount: 500,
    balance: 1750,
    description: 'Credit purchase',
    createdAt: '2026-06-15T10:00:00Z',
  },
  {
    id: '2',
    userId: mockUser.id,
    type: 'deduct',
    amount: -250,
    balance: 1500,
    description: 'Image generation (high-res)',
    createdAt: '2026-06-18T14:30:00Z',
  },
  {
    id: '3',
    userId: mockUser.id,
    type: 'deduct',
    amount: -250,
    balance: 1250,
    description: 'Video transcription',
    createdAt: '2026-06-22T09:15:00Z',
  },
]

// =============================================================================
// ACTIONS (credit-based template)
// =============================================================================

export const mockActions = [
  {
    id: 'image_gen',
    name: 'Image Generation',
    description: 'Generate high-resolution images from text prompts',
    cost: 50,
    category: 'AI Generation',
    icon: 'image',
  },
  {
    id: 'video_gen',
    name: 'Video Generation',
    description: 'Create short videos from text descriptions',
    cost: 150,
    category: 'AI Generation',
    icon: 'video',
  },
  {
    id: 'audio_transcribe',
    name: 'Audio Transcription',
    description: 'Transcribe audio files to text',
    cost: 25,
    category: 'Processing',
    icon: 'mic',
  },
  {
    id: 'translation',
    name: 'Document Translation',
    description: 'Translate documents between languages',
    cost: 30,
    category: 'Processing',
    icon: 'languages',
  },
]
