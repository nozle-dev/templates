import { NextRequest, NextResponse } from 'next/server'
import { getSession, defaultSession } from '@/lib/session'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json(defaultSession)
    }

    return NextResponse.json({
      isLoggedIn: true,
      userId: session.userId,
      email: session.email,
      name: session.name,
      isDemo: session.isDemo,
    })
  } catch (error) {
    console.error('[/api/auth/me] Error:', error)
    return NextResponse.json(defaultSession)
  }
}
