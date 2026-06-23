import { NextRequest, NextResponse } from 'next/server'
import { nozle } from '@/lib/nozle-client'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { feature } = await req.json()

    if (!feature) {
      return NextResponse.json({ error: 'Feature is required' }, { status: 400 })
    }

    const result = await nozle.can(session.userId, feature)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[/api/can] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
