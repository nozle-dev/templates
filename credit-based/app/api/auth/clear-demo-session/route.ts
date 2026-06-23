import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

/**
 * Clears session in demo mode.
 * Called by login page to ensure fresh login on app restart.
 */
export async function POST(request: NextRequest) {
  const isDemoMode = process.env.DEMO_MODE === 'true'

  if (!isDemoMode) {
    return NextResponse.json({ message: 'Not in demo mode' })
  }

  try {
    const session = await getSession()
    session.destroy()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[/api/auth/clear-demo-session] Error:', error)
    return NextResponse.json({ success: true }) // Still return success
  }
}
