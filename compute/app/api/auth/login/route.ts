import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { authenticateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Authenticate user (works in both demo and production modes)
    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session
    const session = await getSession()
    session.userId = user.id
    session.email = user.email
    session.name = user.name
    session.isDemo = process.env.DEMO_MODE === 'true'
    session.isLoggedIn = true
    await session.save()

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isDemo: session.isDemo,
      },
    })
  } catch (error) {
    console.error('[/api/auth/login] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
