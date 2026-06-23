// Authentication utilities
// Supports demo mode (static user from env) and DB mode (real users)

import { isDemoMode, query } from './db'

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

// Demo user from environment variables
function getDemoUser(): User | null {
  const email = process.env.DEMO_USER_EMAIL
  const name = process.env.DEMO_USER_NAME || 'Demo User'

  if (!email) {
    return null
  }

  return {
    id: 'demo_user_1',
    email,
    name,
    createdAt: new Date('2026-01-01'),
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  if (isDemoMode()) {
    // Demo mode: check against static credentials
    const demoEmail = process.env.DEMO_USER_EMAIL
    const demoPassword = process.env.DEMO_USER_PASSWORD

    if (email === demoEmail && password === demoPassword) {
      return getDemoUser()
    }

    return null
  }

  // DB mode: query real users table
  try {
    const result = await query(
      'SELECT id, email, name, password_hash, created_at FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return null
    }

    const user = result.rows[0]

    // In production, use bcrypt to verify password
    // For now, simple comparison (you should implement proper password hashing)
    const bcrypt = require('bcrypt')
    const isValid = await bcrypt.compare(password, user.password_hash)

    if (!isValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(user.created_at),
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  if (isDemoMode()) {
    const demoUser = getDemoUser()
    return demoUser && demoUser.id === userId ? demoUser : null
  }

  try {
    const result = await query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return null
    }

    const user = result.rows[0]
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(user.created_at),
    }
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}
